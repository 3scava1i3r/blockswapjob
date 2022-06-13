import Image from 'next/image'


function Box(props) {
    

    console.log(props.all)
    return (
        <div className="box-out">
            <img src={props.all.image} className="card-image"/>
            <div className="nes-container is-rounded is-dark">
               
            </div>
            <div></div>
        </div>
    );
}

export default Box;