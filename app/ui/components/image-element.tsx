import clsx from "clsx"

interface ImageProps extends React.AllHTMLAttributes<HTMLAllCollection> {
    css:any,
    image?:string
 }

export function ImageElement({
    css,
    image,
    className,
    ...rest
}:Readonly<ImageProps> ) {
    return (
        <>
            { 
                ( image ) ? 
                <>
                    <div style={css.containerCss} className="flex">
                                    <img
                                    style={{
                                    ...{objectFit: 'cover', height: '100%', width: '100%'},
                                    ...css.imageCss,
                                    }}
                                    className={clsx({
                                        [className ? className : '']:true
                                    /*[customClass]: (!!element.customclassname)*/
                                    })}
                                src={image}
                                alt="ImageBlock"
                            />
            
                    </div> 
                </>
                :
                <></>
            }
        </>
    )
}