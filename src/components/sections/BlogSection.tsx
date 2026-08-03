import React, { useState } from 'react';
import { BookOpen, ChevronRight, X } from 'lucide-react';
import { KNOWLEDGE_ARTICLES } from '../../data/concreteData';
import type { KnowledgeArticle } from '../../types/concrete';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const topicsList = [
    'Concrete Curing & PSI Strength',
    'Stamped Concrete vs Pavers',
    'Winter Concrete Sealing & Care',
    'Driveway Rebar Spacing Standards',
    'Foundation Crack Repair Guide',
    'Commercial Slab Load Calculations',
    'Patio Design & Outdoor Kitchens'
  ];

  return (
    <section
      id="blog"
      className="py-20 bg-[#1A1A1A] text-white relative border-b border-white/10 overflow-hidden"
    >
      {/* Texture */}
      <div className="absolute inset-0 bg-concrete-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Concrete Knowledge Center (50+ Guides)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Expert Guides, Tips & Construction Specs
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Learn from master concrete engineers before starting your driveway, patio, or foundation
            project.
          </p>

          {/* Quick Topic Chips */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {topicsList.map((t, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#2D2D2D] text-gray-300 px-2.5 py-1 rounded-full border border-white/10"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KNOWLEDGE_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#2D2D2D] rounded-2xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#F58220]/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-[#121212]">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#F58220] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow">
                  {article.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/80 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {article.readTime}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    {article.publishDate} • By {article.author}
                  </span>
                  <h3 className="text-base font-black text-white group-hover:text-[#F58220] transition-colors mt-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <div className="flex gap-1">
                    {article.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-[#1A1A1A] text-gray-400 px-1.5 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs text-[#F58220] font-extrabold hover:underline flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] text-white border border-white/20 rounded-2xl max-w-3xl w-full p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 bg-[#2D2D2D] hover:bg-white/20 rounded-full text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs bg-[#F58220] text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl font-black text-white mt-3 mb-2">{selectedArticle.title}</h2>
            <p className="text-xs text-gray-400 font-medium mb-4">
              {selectedArticle.publishDate} • {selectedArticle.readTime} • By{' '}
              {selectedArticle.author}
            </p>

            <div className="h-60 rounded-xl overflow-hidden mb-6 bg-[#2D2D2D]">
              <img
                src={selectedArticle.heroImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 text-gray-200">
              <div whitespace-pre-line="true">{selectedArticle.contentMarkdown}</div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="btn-lara-primary px-6 py-2.5 rounded-xl text-xs uppercase font-extrabold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
