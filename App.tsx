
import React, { useState, useCallback } from 'react';
import { Editor } from './components/Editor';
import { Button } from './components/Button';
import { SpecsPanel } from './components/SpecsPanel';
import { GuideModal } from './components/GuideModal';
import { interpretAndromeda, suggestSpecs } from './services/geminiService';
import { DEFAULT_SPECS, INITIAL_CODE } from './constants';
import { LanguageSpecs, ExecutionResult } from './types';

const App: React.FC = () => {
  const [specs, setSpecs] = useState<LanguageSpecs>(DEFAULT_SPECS);
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'specs'>('editor');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    try {
      const res = await interpretAndromeda(code, specs);
      setResult(res);
    } catch (err) {
      setResult({ output: "", error: "The void swallowed your code. Try again.", analysis: "Critical error." });
    } finally {
      setIsRunning(false);
    }
  }, [code, specs]);

  const handleSuggest = useCallback(async () => {
    setIsSuggesting(true);
    try {
      const newSpecs = await suggestSpecs(specs);
      setSpecs(newSpecs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  }, [specs]);

  return (
    <div className="flex h-screen w-full bg-[#030712] text-gray-100 overflow-hidden">
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      
      {/* Sidebar - Desktop Layout */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-gray-800 bg-gray-950/50">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="font-bold text-xl">A</span>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Andromeda
              </h1>
            </div>
          </div>
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/20 transition-all uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <SpecsPanel specs={specs} onChange={setSpecs} />
        </div>
        <div className="p-4 border-t border-gray-800 flex gap-2">
          <Button 
            variant="secondary" 
            className="w-full text-sm" 
            onClick={handleSuggest}
            isLoading={isSuggesting}
          >
            AI Refine Specs
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation for Mobile/Small screens */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
           <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <span className="font-bold text-sm">A</span>
            </div>
            <span className="font-bold">Andromeda</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-xs py-1" 
              onClick={() => setIsGuideOpen(true)}
            >
              Docs
            </Button>
            <Button 
              variant="outline" 
              className="text-xs py-1" 
              onClick={() => setActiveTab(activeTab === 'editor' ? 'specs' : 'editor')}
            >
              {activeTab === 'editor' ? 'Specs' : 'Code'}
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
          {/* Editor Column */}
          <div className={`flex-1 flex flex-col gap-4 ${activeTab === 'specs' ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex-1 relative">
              <Editor title="playground.and" value={code} onChange={setCode} />
              <div className="absolute bottom-6 right-6 flex gap-3">
                 <Button 
                  onClick={handleRun} 
                  isLoading={isRunning} 
                  className="px-8 shadow-xl shadow-indigo-500/30"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Run Code
                </Button>
              </div>
            </div>
          </div>

          {/* Specs Column for Mobile Switch */}
          <div className={`md:hidden flex-col ${activeTab === 'specs' ? 'flex' : 'hidden'}`}>
             <SpecsPanel specs={specs} onChange={setSpecs} />
             <Button 
                variant="secondary" 
                className="mt-4" 
                onClick={handleSuggest}
                isLoading={isSuggesting}
              >
                AI Refine Specs
              </Button>
          </div>

          {/* Console / Output Column */}
          <div className="w-full md:w-96 flex flex-col gap-4">
            {/* Output Panel */}
            <div className="flex-1 flex flex-col bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="px-4 py-2 bg-gray-800/80 border-b border-gray-700 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Console Output</span>
                {result && (
                  <button onClick={() => setResult(null)} className="text-xs text-gray-500 hover:text-gray-300">Clear</button>
                )}
              </div>
              <div className="flex-1 p-4 overflow-auto code-font text-sm">
                {!result && !isRunning && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 italic">
                    <svg className="w-8 h-8 mb-2 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                    <span>Waiting for mission launch...</span>
                  </div>
                )}
                {isRunning && (
                  <div className="animate-pulse flex flex-col gap-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  </div>
                )}
                {result?.error && (
                  <div className="mb-4 p-3 bg-red-900/20 border border-red-900/40 rounded-lg text-red-400 whitespace-pre-wrap">
                    <span className="font-bold block mb-1">ERR_VOID_CRASH:</span>
                    {result.error}
                  </div>
                )}
                {result?.output && (
                  <div className="text-green-400 whitespace-pre-wrap leading-relaxed">
                    {result.output}
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Panel */}
            {result?.analysis && (
              <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className="text-xs font-bold text-indigo-300 uppercase">Engine Analysis</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  "{result.analysis}"
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
