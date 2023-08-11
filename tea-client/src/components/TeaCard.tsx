import { TeaType, PropTeaCardType} from '../ts/interfaces';
import { Buffer } from 'buffer';

export default function TeaCard(props: PropTeaCardType) {

    function isFavorited() {
        const tea_ids = props.currentuser.user.favorite_teas.map((tea : TeaType) => {
            return tea._id;
        });
        return (tea_ids.includes(props.tea._id));
    }

    function isSaved() {
        const tea_ids = props.currentuser.user.saved_teas.map((tea : TeaType) => {
            return tea._id;
        });
        return (tea_ids.includes(props.tea._id));
    }

    function isRecommendation() {
        return props.rec_user !== undefined;
    }

    return (
        <div className="card mr-2 border border-dark rounded mb-3" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            {props.tea?.img ? <img className="card-img-top" style={{height: "13rem", objectFit: "cover"}} src={`data:image/${props.tea.img.contentType};base64, ${Buffer.from(props.tea.img.data).toString('base64')}`} alt="tea-image" /> : <p style={{height: "12rem"}}>There is no image for this tea.</p>}
            <div className="card-body">
                <li><h5 style={{height:"3rem"}} className="mb-3"><a style={{textDecoration: "none", color: "black"}}  data-testid="teacardtest" href={`/teas/${props.tea._id}`}> {props.tea.tea_name.replace("&#x27;", "'")}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {props.tea.brand.replace("&#x27;", "'")} </li>
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li style={{height: "10rem"}}>Notes: {props.tea.notes.replace("&#x27;", "'")} </li>
                {isFavorited() ? <li style={{fontWeight: "bold"}}><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unfavorite/${props.tea._id}`}>Favorited</a></li> : 
                <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/favorite/${props.tea._id}`}>Favorite</a></li>}
                {isSaved() ? <li style={{fontWeight: "bold"}}><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/unsave/${props.tea._id}`}>Saved</a></li> : 
                <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/save/${props.tea._id}`}>Save</a></li>}
                {isRecommendation() ? 
                <div>
                    <li>Recommended by {`${props.rec_user}`}</li> 
                    {props.rec_message ? <li>"{props.rec_message?.replace("&#x27;", "'")}"</li> : ""} 
                    <p></p> 
                    <li><a referrerPolicy="no-referrer-when-downgrade" href={`http://localhost:9000/teas/removerec/${props.tea._id}`} >Remove recommendation</a></li>
                </div> 
                : ""}
            </div>
        </div>
    )
}