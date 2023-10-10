import { TeaType } from "../ts/interfaces"

export default function EditTeaForm( {tea_name, brand, notes, type, rating, img, _id} : TeaType) {


    return (
        <form method="POST" action={`https://tea-share-production.up.railway.app/teas/update/${_id}`} className="updateteaform" id="updateteaform" encType="multipart/form-data" >
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="updateteaname" className="form-control" name="updateteaname" defaultValue={tea_name} required maxLength={50} ></input>
                        <label htmlFor="updateteaname" className="form-label">Tea Name</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="updatebrand" className="form-control" name="updatebrand" defaultValue={brand} maxLength={30} ></input>
                        <label htmlFor="updatebrand" className="form-label">Brand</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <div className="form-floating">
                        <select className="form-select" id="updatetype" aria-label="update tea type" defaultValue={type} name="updatetype">
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Oolong">Oolong</option>
                            <option value="Herbal">Herbal</option>
                            <option value="White">White</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                        <label htmlFor="updatetype" className="form-label">Type of Tea</label>
                    </div>
                </div>
                <div className="form-group col-md-6 mb-3">
                    <div className="form-floating">
                        <select className="form-select" id="updaterating" name="updaterating" aria-label="update tea rating" defaultValue={rating}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <label htmlFor="updaterating" className="form-label">Rating</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <textarea className="form-control" style={{height: "220px"}} id="updatenotes" defaultValue={notes} name="updatenotes" maxLength={400} ></textarea>
                        <label htmlFor="updatenotes" className="form-label">Notes on Tea</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="file" className="form-control" id="updateteaimg" name="updateteaimg"></input>
                        <label htmlFor="updateteaimg" className="form-label">Upload Picture</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" type="submit">Submit</button>
        </form>
    )
}
