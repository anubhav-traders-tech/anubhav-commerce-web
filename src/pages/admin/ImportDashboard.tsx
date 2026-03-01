import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ImportDashboard() {
    const [file, setFile] = useState<File | null>(null);
    const [brand, setBrand] = useState('');
    const [uploading, setUploading] = useState(false);
    const [jobId, setJobId] = useState('');
    const [jobStatus, setJobStatus] = useState({ state: '', progress: 0 });
    const [sessions, setSessions] = useState<any[]>([]);

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (jobId && jobStatus.state !== 'completed' && jobStatus.state !== 'failed') {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`http://localhost:5000/admin/import-status/${jobId}`);
                    const data = await res.json();
                    setJobStatus({ state: data.state, progress: data.progress });
                    if (data.state === 'completed' || data.state === 'failed') {
                        clearInterval(interval);
                        fetchSessions(); // refresh the list
                    }
                } catch (e) {
                    console.error('Failed to fetch job status');
                }
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [jobId, jobStatus]);

    const fetchSessions = async () => {
        try {
            const res = await fetch('http://localhost:5000/admin/import-sessions');
            if (res.ok) {
                setSessions(await res.json());
            }
        } catch (e) {
            console.error('Failed to fetch sessions');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !brand) return alert('Please select a file and enter a brand name');

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('brand', brand);

        try {
            const res = await fetch('http://localhost:5000/admin/import-products', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.jobId) {
                setJobId(data.jobId);
                setJobStatus({ state: 'waiting', progress: 0 });
            }
        } catch (e) {
            alert('Upload failed');
        }
        setUploading(false);
    };

    const handleApprove = async (sessionId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/admin/approve-import/${sessionId}`, { method: 'POST' });
            if (res.ok) {
                alert('Products officially imported to live database!');
                fetchSessions();
            } else {
                alert('Approval failed');
            }
        } catch (e) {
            alert('Error approving session');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-10 border-t border-transparent pt-10">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Catalog Import Engine</h1>
                    <p className="mt-2 text-lg text-gray-500">Upload manufacturer PDFs to automate data structuring via OCR & AI.</p>
                </div>

                {/* Upload Section */}
                <motion.div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Brand Name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                placeholder="e.g. Keya Foods"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Catalog (PDF)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <button
                                type="submit"
                                disabled={uploading || (jobStatus.state === 'active')}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center transition-all shadow-md shadow-blue-600/20"
                            >
                                <Upload className="w-5 h-5 mr-2" />
                                {uploading ? 'Queueing...' : 'Upload & Process'}
                            </button>
                        </div>
                    </form>

                    {/* Job Tracker */}
                    {jobId && (
                        <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-blue-800 uppercase tracking-widest text-left">Processing Engine</span>
                                <span className="text-sm font-medium text-blue-600">{jobStatus.state.toUpperCase()} - {jobStatus.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden shadow-inner">
                                <div className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${jobStatus.progress}%` }}></div>
                            </div>
                            {jobStatus.state === 'active' && <p className="text-sm text-gray-600 animate-pulse">OCR and Deep AI Extraction in progress. Please wait...</p>}
                            {jobStatus.state === 'completed' && <p className="text-sm text-green-600 font-bold flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /> Extraction finished. Pending Admin Review below.</p>}
                        </div>
                    )}
                </motion.div>

                {/* Review Dashboard */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Pending Imports Review</h2>
                    {sessions.length === 0 && <p className="text-gray-500 italic">No import sessions found.</p>}

                    {sessions.map(session => (
                        <motion.div key={session._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-white rounded-3xl overflow-hidden border ${session.status === 'pending' ? 'border-amber-200 shadow-xl shadow-amber-900/5' : 'border-gray-200 opacity-60'}`}>
                            <div className={`px-8 py-5 flex justify-between items-center bg-gray-50/50 border-b border-gray-100`}>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{session.brand}</h3>
                                    <p className="text-sm font-mono text-gray-500 mt-1 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" /> {new Date(session.createdAt).toLocaleString()}
                                        <span className="mx-2">•</span>
                                        {session.products.length} Products Found
                                    </p>
                                </div>
                                <div>
                                    {session.status === 'pending' ? (
                                        <button onClick={() => handleApprove(session._id)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center shadow-lg shadow-amber-500/20">
                                            <AlertCircle className="w-5 h-5 mr-2" /> Approve & Inject
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                            <CheckCircle className="w-4 h-4 mr-2" /> {session.status.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-8">
                                <ul className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                                    {session.products.map((p: any, i: number) => (
                                        <li key={i} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg">{p.name} <span className="text-xs ml-2 px-2 py-1 bg-gray-100 rounded-md text-gray-600 uppercase">{p.category}</span></div>
                                            </div>
                                            <div className="text-right">
                                                {p.variants?.map((v: any, vi: number) => (
                                                    <div key={vi} className="text-sm mt-1">
                                                        <span className="font-mono text-gray-500 text-xs mr-3 bg-gray-50 px-2 py-1 rounded">{v.sku}</span>
                                                        <span className="font-bold text-gray-700">{v.weight}</span>
                                                        <span className="mx-2 text-gray-300">|</span>
                                                        <span className="text-green-600 font-bold">₹{v.price || 'N/A'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
