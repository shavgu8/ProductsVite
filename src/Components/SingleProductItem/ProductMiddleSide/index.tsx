import { Includes } from '../../../Static/type'
import style from '../style.module.css'

type Props ={
    features:string,
    includes:Includes[]
}

const ProductMiddleSide =(props:Props) =>{
    const{features,includes} = props;
    const featureParagraphs = features.split("\n\n");
    return(
        <div className={style['product-middleSide']}>
            <div className={style['feature-side']}>
                <h4>features</h4>
                {featureParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className={style["boxContains-side"]}>
                <div>
                     <h4>in the box</h4>
                </div>
               <div>
                    <ul>
                        {includes.map((item,index) =>{
                            return(
                                <li key={index}>
                                    <p>{item.quantity}x</p>
                                    <span>{item.item}</span>
                                </li>
                            )
                        })}
                    </ul>
               </div>
            </div>
        </div>
    )
}
export default ProductMiddleSide