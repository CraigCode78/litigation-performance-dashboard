import React, { useState, useEffect } from 'react';
import { Users, Brain, FileText, Clock, AlertCircle, TrendingUp, Check, 
         Search, BookOpen, Gavel, FileCheck, Network, ArrowRight, Workflow, Bot, Microscope, Filter } from 'lucide-react';

const ProcessStep = ({ icon: Icon, title, description, isAI }) => (
  <div className={`flex items-center space-x-2 p-2 rounded-lg ${isAI ? 'bg-emerald-50' : 'bg-red-50'}`}>
    <Icon size={16} className={isAI ? 'text-emerald-500' : 'text-red-500'} />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

const LitigationComparison = () => {
  const [progress, setProgress] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [documents, setDocuments] = useState(0);
  const [aiDocuments, setAiDocuments] = useState(0);
  const [showMetrics, setShowMetrics] = useState(false);
  const [processedDocs, setProcessedDocs] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Slower progress for human process to represent days of work
    const timer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 0.1 : prev);
      setAiProgress(prev => prev < 100 ? prev + 1 : prev);
      
      // Update documents processed
      setDocuments(prev => prev < 1000 ? prev + 1 : prev);
      setAiDocuments(prev => prev < 1000 ? prev + 10 : prev);
      
      // Update processed docs count
      setProcessedDocs(prev => prev < 1000 ? prev + 5 : prev);
      
      // Update time elapsed
      setTimeElapsed(prev => prev + 1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(Math.floor(num));
  };

  // Format time elapsed
  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    return `${Math.round(seconds / 3600)} hours`;
  };

  // Process steps data
  const processSteps = [
    { title: "Document Analysis", humanTime: "4 hours", aiTime: "30 seconds" },
    { title: "Legal Research", humanTime: "8 hours", aiTime: "45 seconds" },
    { title: "Case Evaluation", humanTime: "6 hours", aiTime: "15 seconds" },
    { title: "Document Generation", humanTime: "4 hours", aiTime: "10 seconds" },
  ];

  // Simulate step progression
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % processSteps.length);
    }, 2000);

    return () => clearInterval(stepTimer);
  }, [processSteps.length]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Litigation Case Management: Human vs AI Agents
      </h2>

      {/* Real-time Stats Banner */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{formatNumber(processedDocs)}</div>
            <div className="text-xs text-gray-500 mt-1">Documents Processed</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{formatTime(timeElapsed)}</div>
            <div className="text-xs text-gray-500 mt-1">Time Elapsed</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Cost Per Case</div>
            <div className="flex items-center justify-center space-x-2">
              <div className="text-center">
                <div className="text-red-400 line-through text-sm">$3,450.00</div>
                <div className="text-emerald-600 text-xl font-bold">$0.25</div>
              </div>
            </div>
            <div className="text-emerald-600 text-xs mt-1">99.99% Savings</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Annual Savings</div>
            <div className="text-2xl font-bold text-emerald-600">
              ${formatNumber(Math.floor((3450 - 0.25) * 365))}
            </div>
            <div className="text-xs text-gray-500 mt-1">per case/day</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Human Side */}
        <div className="bg-white p-6 rounded-xl border border-red-200 relative">
          <div className="flex items-center justify-center mb-6">
            <Users size={40} className="text-red-500" />
            <h3 className="text-xl font-semibold ml-3 text-red-700">Traditional Process</h3>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Case Processing</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <Clock size={20} className="text-red-500" />
              <div className="text-right">
                <span className="font-medium">Processing Time</span>
                <div className="text-sm text-gray-500">3 Days</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <AlertCircle size={20} className="text-red-500" />
              <div className="text-right">
                <span className="font-medium">Error Rate</span>
                <div className="text-sm text-gray-500">8-12%</div>
              </div>
            </div>
          </div>

          {/* Document Processing Visualization */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Documents/Hour</span>
              <span className="text-sm font-medium">~30</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array(10).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className={`h-8 rounded flex items-center justify-center
                    ${i < documents/10 ? 'bg-red-100' : 'bg-gray-100'}`}
                >
                  <FileText size={16} className={i < documents/10 ? 'text-red-500' : 'text-gray-400'} />
                </div>
              ))}
            </div>
          </div>

          {/* Resource Usage */}
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Building2 size={20} className="text-red-500" />
              <span className="font-medium">Resources Required</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-8 bg-red-200 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-red-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Side */}
        <div className="bg-white p-6 rounded-xl border border-emerald-200 relative">
          <div className="flex items-center justify-center mb-6">
            <Brain size={40} className="text-emerald-500" />
            <h3 className="text-xl font-semibold ml-3 text-emerald-700">AI Agent Process</h3>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Case Processing</span>
              <span className="text-sm font-medium">{Math.round(aiProgress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${aiProgress}%` }}
              />
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <Zap size={20} className="text-emerald-500" />
              <div className="text-right">
                <span className="font-medium">Processing Time</span>
                <div className="text-sm text-gray-500">30 Seconds</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <Check size={20} className="text-emerald-500" />
              <div className="text-right">
                <span className="font-medium">Error Rate</span>
                <div className="text-sm text-gray-500">&lt; 0.1%</div>
              </div>
            </div>
          </div>

          {/* Document Processing Visualization */}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Documents/Hour</span>
              <span className="text-sm font-medium">~36,000</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array(10).fill(0).map((_, i) => (
                <div 
                  key={i}
                  className={`h-8 rounded flex items-center justify-center
                    ${i < aiDocuments/10 ? 'bg-emerald-100' : 'bg-gray-100'}`}
                >
                  <FileText size={16} className={i < aiDocuments/10 ? 'text-emerald-500' : 'text-gray-400'} />
                </div>
              ))}
            </div>
          </div>

          {/* AI Network Animation */}
          <div className="mt-6 flex justify-center pb-6">
            <div className="relative h-24 w-24">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Brain size={24} className="text-emerald-500" />
              </div>
              {Array(6).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping"
                  style={{
                    left: `${50 + 35 * Math.cos(2 * Math.PI * i / 6)}%`,
                    top: `${50 + 35 * Math.sin(2 * Math.PI * i / 6)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Complexity Visualization */}
      <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Process Complexity Analysis</h3>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Human Process Steps */}
          <div className="space-y-3">
            <div className="text-lg font-semibold text-red-700 mb-4">Traditional Process Steps</div>
            <ProcessStep
              icon={Search}
              title="Manual Document Review"
              description="Individual document analysis by legal staff"
              isAI={false}
            />
            <ProcessStep
              icon={BookOpen}
              title="Legal Research"
              description="Manual search through case law and precedents"
              isAI={false}
            />
            <ProcessStep
              icon={Gavel}
              title="Case Analysis"
              description="Individual case evaluation and strategy development"
              isAI={false}
            />
            <ProcessStep
              icon={FileCheck}
              title="Document Preparation"
              description="Manual document drafting and review"
              isAI={false}
            />
          </div>

          {/* AI Process Steps */}
          <div className="space-y-3">
            <div className="text-lg font-semibold text-emerald-700 mb-4">AI-Powered Process</div>
            <ProcessStep
              icon={Bot}
              title="Automated Document Processing"
              description="Parallel processing of multiple documents"
              isAI={true}
            />
            <ProcessStep
              icon={Network}
              title="Neural Network Analysis"
              description="AI-powered legal precedent matching"
              isAI={true}
            />
            <ProcessStep
              icon={Microscope}
              title="Deep Learning Analysis"
              description="Pattern recognition and case evaluation"
              isAI={true}
            />
            <ProcessStep
              icon={Workflow}
              title="Automated Generation"
              description="AI-driven document creation and validation"
              isAI={true}
            />
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <div className="text-center text-sm font-medium mb-4">Process Timeline Comparison</div>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(activeStep + 1) * (100 / processSteps.length)}%`,
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {processSteps.map((step, index) => (
                <div key={index} className={`text-center ${index <= activeStep ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs mt-1">
                    <span className="line-through text-red-400">{step.humanTime}</span>
                    <ArrowRight className="inline mx-1" size={12} />
                    <span className="text-emerald-500">{step.aiTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <Network className="mx-auto mb-2 text-emerald-500" size={24} />
            <div className="text-center">
              <div className="text-sm font-medium">Parallel Processing</div>
              <div className="text-xs text-gray-500">Multiple cases simultaneously</div>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg">
            <Filter className="mx-auto mb-2 text-emerald-500" size={24} />
            <div className="text-center">
              <div className="text-sm font-medium">Smart Filtering</div>
              <div className="text-xs text-gray-500">Automated relevance detection</div>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-lg">
            <Bot className="mx-auto mb-2 text-emerald-500" size={24} />
            <div className="text-center">
              <div className="text-sm font-medium">24/7 Operation</div>
              <div className="text-xs text-gray-500">Continuous processing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      {showMetrics && (
        <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-center mb-6 text-gray-800">ROI Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
              <Clock size={24} className="mx-auto mb-2 text-emerald-600" />
              <h4 className="font-semibold text-lg text-center">99.99% Faster</h4>
              <p className="text-sm text-gray-600 text-center">Processing Speed</p>
              <div className="mt-2 text-xs text-gray-500 text-center">
                3 Days → 30 Seconds
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
              <DollarSign size={24} className="mx-auto mb-2 text-emerald-600" />
              <h4 className="font-semibold text-lg text-center">99.99% Cost Reduction</h4>
              <p className="text-sm text-gray-600 text-center">Operational Costs</p>
              <div className="mt-2 text-xs text-gray-500 text-center">
                $3,450.00 → $0.25
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
              <TrendingUp size={24} className="mx-auto mb-2 text-emerald-600" />
              <h4 className="font-semibold text-lg text-center">99.9% Accuracy</h4>
              <p className="text-sm text-gray-600 text-center">Error Reduction</p>
              <div className="mt-2 text-xs text-gray-500 text-center">
                &lt; 0.1% vs 8-12% error rate
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LitigationComparison;
