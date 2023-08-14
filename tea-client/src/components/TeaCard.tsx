import { TeaType, PropTeaCardType} from '../ts/interfaces';
import { Buffer } from 'buffer';
import { cleanString } from '../services/teaFunctions';

export default function TeaCard(props: PropTeaCardType) {

    function isFavorited(favoriteArray: TeaType[], teaID: string) {
        const tea_ids = favoriteArray.map((tea : TeaType) => {
            return tea._id;
        });
        if (tea_ids.includes(teaID)) {
            return <li style={{fontWeight: "bold"}}><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unfavorite/${teaID}`}>Favorited</a></li>
        } else {
            return <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/favorite/${teaID}`}>Favorite</a></li>
        }
    }

    function isSaved(savedArray: TeaType[], teaID: string) {
        const tea_ids = savedArray.map((tea : TeaType) => {
            return tea._id;
        });
        if (tea_ids.includes(teaID)) {
            return <li style={{fontWeight: "bold"}}><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unsave/${props.tea._id}`}>Saved</a></li>
        } else {
            return <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/save/${props.tea._id}`}>Save</a></li>
        }
    }

    function isRecommendation(recommendee: string | undefined, message: string | undefined, teaID: string) {
        if (recommendee !== undefined) {
            return (
                <div>
                    <li>Recommended by {`${recommendee}`}</li> 
                    {message ? <li>"{cleanString(message)}"</li> : ""} 
                    <p></p> 
                    <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/removerec/${teaID}`} >Remove recommendation</a></li>
                </div>   
        )}  else {
            return "";
        }
    }

    return (
        <div className="card mr-2 border border-dark rounded mb-3" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            {props.tea?.img ? <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src={`data:image/${props.tea.img.contentType};base64, ${Buffer.from(props.tea.img.data).toString('base64')}`} alt="tea-image" /> : <p style={{height: "12rem"}}>There is no image for this tea.</p>}
            <div className="card-body">
                <li><h5 style={{height:"3rem"}} className="mb-3"><a style={{textDecoration: "none", color: "black"}}  data-testid="teacardtest" href={`/teas/${props.tea._id}`}> {cleanString(props.tea.tea_name)}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {cleanString(props.tea.brand)} </li>
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li className="overflow-auto" style={{height: "6rem", border: "solid 1px black"}}>Notes: {cleanString(props.tea.notes)} </li>
                {isFavorited(props.currentuser.user.favorite_teas, props.tea._id)}
                {isSaved(props.currentuser.user.saved_teas, props.tea._id)}
                {isRecommendation(props.rec_user, props.rec_message, props.tea._id)}
            </div>
        </div>
    )
}