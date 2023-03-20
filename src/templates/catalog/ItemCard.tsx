import React from "react";
import '../../styles/itemCard.scss';

interface Item {
    item: {
        id: number,
        name: String,
        brand: String,
        price: Number,
        rate: number,
        comment: Number,
        link: string,
    }
}

const starFullLink : string = 'https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.png';
const starEmptyLink : string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png';

class CatalogItem extends React.Component<Item> {
   

    render() {
        return (
        <div className="item-card" >
            <div className='img-wrapper'>
                <img src={this.props.item.link} alt={'image of'+this.props.item.name} height='250px'/>
            </div>
            <h3 className="item-title">{this.props.item.name}</h3>
            <p className="item-price">{`Brand: ${this.props.item.brand}`}</p>
            <p className="item-price">{`${this.props.item.price} BYN`}</p>
                <div className="rate-wrapper">
                    {
                        this.renderFullStar(this.props.item.rate)   
                    }
                    {
                        this.renderEmptyStar(this.props.item.rate)
                    }
                    <p>{`( ${this.props.item.comment} )`}</p>
                </div>
        </div>
        )
    }

    renderFullStar = (length : number)  => {
        let content = [];
        for (let i = 0; i < length; i++) {
          content.push(<img src={starFullLink} alt="fullStar" width="30px" key={i}/>);
        }
        return content;
      };
      renderEmptyStar = (length : number)  => {
        let content = [];
        for (let i = 0; i < 5 - length; i++) {
          content.push(<img src={starEmptyLink} alt="emptyStar" width="30px" key={i}/>);
        }
        return content;
      };

}

export default CatalogItem;