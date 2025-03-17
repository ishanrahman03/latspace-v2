"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { IconType } from "react-icons";
import { BiBold, BiItalic, BiStrikethrough, BiLink, BiAlignLeft, BiAlignMiddle, BiAlignRight, BiListUl } from "react-icons/bi";

const IconButton: React.FC<{ icon: IconType }> = ({ icon: Icon }) => {
  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default function ReportComposerV2() {
  const [editorContent, setEditorContent] = React.useState(
    "Apple Inc. - Climate Change 2025\n\nC0.\n\nIntroduction C0.1\n(C0.1) Give a general description and introduction to your organization.\n\nApple Inc. and its wholly-owned subsidiaries (hereinafter, collectively, Apple or the Company) designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories, and sells a variety of related services. The Company's products include iPhone®, iPad®, Mac®, Apple Watch®, AirPods®, AirPods Max™, Apple TV®, Beats® products, HomePod® and accessories. The Company operates various platforms, including the App Store® that allow customers to discover and download applications and digital content, such as books, music, videos, games and podcasts. Apple also offers digital content through subscription-based services, including Apple Arcade®, Apple Music®, Apple News+®, Apple TV+® and Apple Fitness+SM, and a variety of other services, including AppleCare®, iCloud®, Apple Card®, and Apple Pay®. The Company's customers are primarily in the consumer, small and mid-sized business, education, enterprise and government markets. The Company sells its products and resells third-party products in most of its major markets directly to consumers, small and mid-sized businesses, and education, enterprise and government customers through its retail and online stores and its direct sales force. The Company also employs a variety of indirect distribution channels, such as third-party cellular network carriers, wholesalers, retailers and resellers. The Company's fiscal year is the 52 or 53-week period that ends on the last Saturday of September, with fiscal year 2022 beginning September 26, 2021 and ending on September 24, 2022. Please note the reporting year and date in C0.2 has been modified solely to meet CDP's Online Reporting System (ORS) system constraints. Apple has provided responses in this Questionnaire upon the request of the CDP signatory investors, RE100, and select customers. All such responses are provided solely on a non-reliance basis. Apple's responses may also contain forward-looking statements that involve risks and uncertainties. Forward-looking statements provide current expectations of future events based on certain assumptions and include any statement that does not directly relate to any historical or current fact. Forward-looking statements are not guarantees of future performance and the Company's actual results may differ significantly from the results discussed in the forward-looking statements."
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <div className="flex items-center h-12 px-4 border-b">
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700">
            <span>←</span> 
            <span>Apple Inc. CDP Climate Change Questionnaire 2025</span>
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#0284c7] hover:bg-transparent">
            View Changelog ×
          </Button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center h-12 px-4 border-b gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 cursor-pointer">
            <span className="text-gray-700">Paragraph</span>
          </div>
          <div className="flex items-center border rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 cursor-pointer">
            <span className="text-gray-700">Lausanne</span>
          </div>
          <div className="flex items-center gap-1 border rounded px-2 py-1 text-sm bg-white">
            <span>16</span>
            <span className="text-gray-500">px</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 border-l pl-2">
          <IconButton icon={BiBold} />
          <IconButton icon={BiItalic} />
          <IconButton icon={BiStrikethrough} />
        </div>

        <div className="flex items-center gap-1 border-l pl-2">
          <IconButton icon={BiLink} />
        </div>

        <div className="flex items-center gap-1 border-l pl-2">
          <IconButton icon={BiAlignLeft} />
          <IconButton icon={BiAlignMiddle} />
          <IconButton icon={BiAlignRight} />
        </div>

        <div className="flex items-center gap-1 border-l pl-2">
          <IconButton icon={BiListUl} />
        </div>

        <div className="flex items-center gap-1 border-l pl-2">
          <div className="h-5 w-5 bg-black rounded-full cursor-pointer" />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="text-sm font-normal">Aa</Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Textarea
            className="w-full h-full min-h-[calc(100vh-96px)] font-serif text-base border-none focus-visible:ring-0 resize-none p-4"
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Chat Sidebar */}
        <div className="w-[320px] border-l bg-[#fafafa] flex flex-col">
          <div className="p-4 flex flex-col h-full">
            <div className="text-sm text-gray-500 mb-2 flex items-center justify-between">
              <span>Cascade | Chat mode (Ctrl + ,)</span>
              <div className="flex items-center gap-1">
                <button className="p-1 opacity-50 hover:opacity-100">+</button>
                <button className="p-1 opacity-50 hover:opacity-100">⌚</button>
                <button className="p-1 opacity-50 hover:opacity-100">...</button>
                <button className="p-1 opacity-50 hover:opacity-100">×</button>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 rounded-full border-t-transparent animate-spin" />
                </div>
                <h3 className="text-lg mb-2">Chat with Cascade</h3>
                <p className="text-sm text-gray-500 max-w-[240px] mx-auto">
                  Ask questions or request suggestions for your codebase or coding in general
                </p>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <span>0 available MCP servers</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700">Configure MCP</button>
              </div>
              <div className="relative">
                <Input
                  placeholder="Ask anything (Ctrl+L), @ to mention code blocks"
                  className="pr-10 bg-white text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="fill-current">
                      <path d="M13.5 2.5L3 7l4 2m6.5-6.5L9 14l-2-5L3 7l10.5-4.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 