import { PropTeaCardType } from "../ts/interfaces";
import { Buffer } from "buffer";
import { cleanString, handlePost } from "../services/teaFunctions";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TeaCard(props: PropTeaCardType) {
    const [isRecommended, setIsRecommended] = useState(props.rec_user !== undefined);

    // Recommendation display logic
    function isRecommendation(recommendee: string | undefined, message: string | undefined, teaID: string, id: string | undefined) {
        if (recommendee !== undefined) {
            return (
                <div data-testid="teacardrecommendedtest">
                    <li>Recommended by <Link style={{textDecoration: "none", color: "black", fontWeight:"bold"}} to={`/user/profile/${id}`}>{`${recommendee}`}</Link></li> 
                    {message ? <li>"{cleanString(message)}"</li> : ""} 
                    <p></p> 
                    <li><button onClick={() => handleClick(teaID)}>{isRecommended ? "Remove recommendation" : "Removed"} </button></li>
                </div>   
        )}
    }

    function handleClick(teaID: string) {
        handlePost(`http://localhost:9000/teas/removerec/${teaID}`);
        setIsRecommended(false);

    }

    return (
        <div className="card mr-2 border border-dark rounded mb-3" style={{backgroundColor: "peachpuff", maxWidth: "18rem"}}>
            {props.tea?.img ? 
                <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src={`data:image/${props.tea.img.contentType};base64, ${Buffer.from(props.tea.img.data).toString('base64')}`} alt="tea-image" /> : 
                <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src="/images/tea1.jpg" alt="default-tea-image" /> 
            }
            <div className="card-body">
                <li><h5 style={{height:"2rem"}} className="mb-3"><Link style={{textDecoration: "none", color: "black"}}  data-testid="teacardnametest" to={`/teas/${props.tea._id}`}> {cleanString(props.tea.tea_name)}</Link></h5></li> 
                <li>Type: {props.tea.type} </li> 
                {props.tea.brand ? <li>Brand: {cleanString(props.tea.brand)} </li> : <li>Brand: Unknown</li>}
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li className="overflow-auto" style={{height: "6rem", border: "solid 1px black"}}>Notes: {cleanString(props.tea.notes)} </li>
                {isRecommendation(props.rec_user, props.rec_message, props.tea._id, props.rec_id)}                       
            </div>
        </div>
    )
}