import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Cpu, Brain, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export const SystemArch: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    {
      title: "1. High-Speed Landing Ingestion",
      tech: "React / Vite / Edge caching",
      details: "Client visits a mobile-optimized lander. Static site builds run on Cloudflare edge routing, loading page structure under 0.8s. Quick loading avoids 22% attic bounce drop-off.",
      icon: Laptop,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20"
    },
    {
      title: "2. Serverless Webhook Ingest",
      tech: "n8n / Node endpoints",
      details: "Contact data maps dynamically to serverless endpoint webhooks. Processing time takes less than 1.2s, filtering spam calls and formatting payloads before storing to database.",
      icon: Cpu,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-950/20"
    },
    {
      title: "3. AI Urgency Classifier",
      tech: "OpenAI JSON API",
      details: "An AI parses customer logs (e.g. 'pipe burst and flooded first floor') to evaluate urgency. Emergency alerts are triaged instantly; standard requests follow standard schedules.",
      icon: Brain,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-950/20"
    },
    {
      title: "4. Twilio SMS Routing Portal",
      tech: "Twilio SMS API",
      details: "Twilio routes critical lead alerts straight to regional technician mobile units using SMS payloads containing job values and geographic links.",
      icon: MessageSquare,
      color: "text-amber-400 border-amber-500/20 bg-amber-950/20"
    },
    {
      title: "5. Proximity Field Dispatch",
      tech: "GPS / Field API CRM",
      details: "The closest technician reviews and accepts bookings via SMS. Dispatch is complete. Total speed-to-lead latency: under 45 seconds.",
      icon: ShieldCheck,
      color: "text-purple-400 border-purple-500/20 bg-purple-950/20"
    }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 space-y-8">
      <div>
        <h3 className="font-display font-bold text-xl text-white mb-2">
          Interactive Lead Pipeline Blueprint
        </h3>
        <p className="text-xs text-gray-400">
          Click any architecture node to see details of how our system completes dispatch in under 45 seconds.
        </p>
      </div>

      {/* Nodes Flowchart row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4 relative">
        {nodes.map((node, idx) => {
          const NodeIcon = node.icon;
          const isActive = idx === activeNode;
          return (
            <React.Fragment key={idx}>
              {/* Node Card */}
              <button
                onClick={() => setActiveNode(idx)}
                className={`w-full lg:w-44 p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center space-y-3 cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-950/30 scale-105 shadow-lg shadow-emerald-500/10'
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                }`}
              >
                <div className={`p-2.5 rounded-xl border ${node.color}`}>
                  <NodeIcon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white leading-tight">{node.title.split('. ')[1]}</div>
                  <div className="text-[9px] text-gray-500 font-mono">{node.tech}</div>
                </div>
              </button>

              {/* Arrow separator (only between nodes) */}
              {idx < nodes.length - 1 && (
                <div className="text-gray-600 hidden lg:block">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Node Detail Description Panel */}
      <motion.div
        key={activeNode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="glass-panel-elevated rounded-2xl p-6 border border-white/5 space-y-3"
      >
        <div className="flex items-center space-x-2 text-emerald-400">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">Node Profile</span>
          <span className="text-xs font-bold">/</span>
          <span className="text-xs font-bold text-white font-mono">{nodes[activeNode].tech}</span>
        </div>
        <h4 className="font-display font-bold text-lg text-white">
          {nodes[activeNode].title}
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed font-normal">
          {nodes[activeNode].details}
        </p>
      </motion.div>
    </div>
  );
};
