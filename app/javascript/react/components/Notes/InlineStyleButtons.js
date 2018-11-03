import React from 'react'
import StyleButton from './StyleButton'

let INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Inline Code', style: 'CODE'},
];

const InlineStyleButtons = (props) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="notes-style-buttons">
    {INLINE_STYLES.map(type =>
      <StyleButton
      key={type.label}
      active={currentStyle.has(type.style)}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
      />
    )}
    </div>
  );
};

export default InlineStyleButtons;
