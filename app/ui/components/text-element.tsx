interface TextProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    css:any,
    content:string
 }

export function TextElement({
    css,
    content,
    className,
    ...rest
}:Readonly<TextProps> ) {
    return (
            <div 
            className={className}
            style={css.textCss} 
            >
          {content}
            </div>
    )
}