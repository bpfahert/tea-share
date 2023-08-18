import { PropTeaCardType, TeaType } from "../ts/interfaces";
import { Buffer } from "buffer";
import React from "react";
import { cleanString } from "../services/teaFunctions";

export default function TeaCard(props: PropTeaCardType) {
    const [favoriteStatus, setFavoriteStatus] = React.useState<boolean>();
    const [saveStatus, setSaveStatus] = React.useState<boolean>();


    React.useEffect(() => {
        setFavoriteStatus(isFavorited());
        setSaveStatus(isSaved());
    },[])

    async function handlePost(url: string) {
        const response = await fetch(url, {method: "POST", credentials: "include"});
        const json = await response.json();
        return json;
    }

    // TODO: 
    function isFavorited() {
        const tea_ids = props.currentuser.user.favorite_teas.map((favoriteTea : TeaType) => {
            return favoriteTea._id;
        });
        return (tea_ids?.includes(props.tea._id));
    }

    let displayFavoriteButton = favoriteStatus ? <button onClick={() => handleFavorite()}>Unfavorite</button> : <button onClick={() => handleFavorite()}>Favorite</button>;

    async function handleFavorite() {
        if (props.currentuser !== undefined) {
            if(favoriteStatus === true) {
                await handlePost(`http://localhost:9000/teas/unfavorite/${props.tea?._id}`);
                setFavoriteStatus(false);
            } else {
                await handlePost(`http://localhost:9000/teas/favorite/${props.tea?._id}`);
                setFavoriteStatus(true);
            }
        }
    }

    // Save logic
    function isSaved() {
        const tea_ids = props.currentuser.user.saved_teas.map((savedTea : TeaType) => {
            return savedTea._id;
        });
        return (tea_ids?.includes(props.tea._id));
    }

    let displaySaveButton = saveStatus ? <button onClick={() => handleSave()}>Unsave</button> : <button onClick={() => handleSave()}>Save</button>;

    async function handleSave() {
        if (props.currentuser !== undefined) {
            if(saveStatus === true) {
                await handlePost(`http://localhost:9000/teas/unsave/${props.tea?._id}`);
                setSaveStatus(false);
            } else {
                await handlePost(`http://localhost:9000/teas/save/${props.tea?._id}`);
                setSaveStatus(true);
            }
        }
    }


    // Recommendation logic

    function isRecommendation(recommendee: string | undefined, message: string | undefined, teaID: string, id: string | undefined) {
        if (recommendee !== undefined) {
            return (
                <div>
                    <li>Recommended by <a style={{textDecoration: "none", color: "black", fontWeight:"bold"}} href={`/user/profile/${id}`}>{`${recommendee}`}</a></li> 
                    {message ? <li>"{cleanString(message)}"</li> : ""} 
                    <p></p> 
                    <li><button onClick={() => handlePost(`http://localhost:9000/teas/removerec/${teaID}`)}>Remove recommendation</button></li>
                </div>   
        )}  else {
            return "";
        }
    }


    return (
        <div className="card mr-2 border border-dark rounded mb-3" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            {props.tea?.img ? 
                <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src={`data:image/${props.tea.img.contentType};base64, ${Buffer.from(props.tea.img.data).toString('base64')}`} alt="tea-image" /> : 
                <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src="/images/tea1.jpg" alt="default-tea-image" /> 
            }
            <div className="card-body">
                <li><h5 style={{height:"3rem"}} className="mb-3"><a style={{textDecoration: "none", color: "black"}}  data-testid="teacardtest" href={`/teas/${props.tea._id}`}> {cleanString(props.tea.tea_name)}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {cleanString(props.tea.brand)} </li>
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li className="overflow-auto" style={{height: "6rem", border: "solid 1px black"}}>Notes: {cleanString(props.tea.notes)} </li>
                {displayFavoriteButton}
                {displaySaveButton}
                {isRecommendation(props.rec_user, props.rec_message, props.tea._id, props.rec_id)}                       
            </div>
        </div>
    )
}