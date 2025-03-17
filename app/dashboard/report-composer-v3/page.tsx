"use client";

import * as React from "react";
import { createEditor, Descendant, BaseEditor, Editor } from "slate";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import { useAppDispatch, useAppSelector } from "@/latSpace/lib/redux/hooks";
import { updatePageContent } from "@/latSpace/lib/redux/editorSlice";
import { RootState } from "@/latSpace/lib/redux/store";
import { Button } from "@/components/ui/button";
import { BiBold, BiItalic, BiStrikethrough } from "react-icons/bi";

type CustomText = { text: string; bold?: boolean; italic?: boolean; strikethrough?: boolean }
type FormattingType = 'bold' | 'italic' | 'strikethrough';

const IconButton = ({ icon: Icon, active = false, onMouseDown, disabled = false }: { icon: any, active?: boolean, onMouseDown: (e: React.MouseEvent) => void, disabled?: boolean }) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`h-8 w-8 p-0 ${active ? 'bg-gray-100' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

function ReportComposerV3Content() {
  const dispatch = useAppDispatch();
  const { pages, currentPageIndex } = useAppSelector((state: RootState) => state.editor);
  // Create a new editor instance for each render to avoid state conflicts
  const editor = React.useMemo(() => {
    const e = withHistory(withReact(createEditor()));
    
    // Override isVoid to make the editor read-only when needed
    const { isVoid } = e;
    e.isVoid = element => {
      return pages[currentPageIndex].readOnly || isVoid(element);
    };
    
    return e;
  }, [currentPageIndex, pages]);

  const [chatWidth, setChatWidth] = React.useState(320);
  const resizerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  // Get current page content from Redux store
  const currentPageContent = pages[currentPageIndex].content;

  // Handle value changes in the editor and update Redux state
  const handleEditorChange = (value: Descendant[]) => {
    if (!pages[currentPageIndex].readOnly) {
      dispatch(updatePageContent(value));
    }
  };

  const toggleMark = (format: FormattingType) => {
    if (pages[currentPageIndex].readOnly) return;
    const isActive = isMarkActive(format);
    if (isActive) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  };

  const isMarkActive = (format: FormattingType) => {
    if (!editor) return false;
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Toolbar */}
      <div className="flex items-center h-12 px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="border rounded px-2 py-1 text-sm">Paragraph</div>
          <div className="border rounded px-2 py-1 text-sm">Font: 16px</div>
          <div className="flex items-center gap-1 border-l pl-2">
            <IconButton 
              icon={BiBold} 
              active={isMarkActive('bold')}
              disabled={pages[currentPageIndex].readOnly}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark('bold');
              }}
            />
            <IconButton 
              icon={BiItalic}
              active={isMarkActive('italic')}
              disabled={pages[currentPageIndex].readOnly}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark('italic');
              }}
            />
            <IconButton 
              icon={BiStrikethrough}
              active={isMarkActive('strikethrough')}
              disabled={pages[currentPageIndex].readOnly}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark('strikethrough');
              }}
            />
          </div>
        </div>
        {pages[currentPageIndex].readOnly && (
          <div className="ml-4 text-sm text-gray-500">
            This page is read-only
          </div>
        )}
      </div>

      <Slate 
        editor={editor} 
        initialValue={currentPageContent}
        onChange={handleEditorChange}
        key={`editor-${currentPageIndex}`}
      >
        <Editable
          className={`w-full h-full min-h-[calc(100vh-96px)] p-4 font-serif text-base ${pages[currentPageIndex].readOnly ? 'cursor-not-allowed bg-gray-50' : ''}`}
          readOnly={pages[currentPageIndex].readOnly}
          onKeyDown={(event) => {
            if (pages[currentPageIndex].readOnly) {
              event.preventDefault();
            }
          }}
          renderLeaf={(props: RenderLeafProps) => {
            let { attributes, children, leaf } = props;
            if (leaf.bold) {
              children = <strong>{children}</strong>;
            }
            if (leaf.italic) {
              children = <em>{children}</em>;
            }
            if (leaf.strikethrough) {
              children = <s>{children}</s>;
            }
            return <span {...attributes}>{children}</span>;
          }}
        />
      </Slate>
    </div>
  );
}

export default ReportComposerV3Content; 