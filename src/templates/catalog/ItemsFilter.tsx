import React from "react";
import '../../styles/ItemFilter.scss';

interface Item {
    id: number,
    name: String,
    brand: string,
    price: Number,
    rate: number,
    comment: Number,
    link: string,
}

class ItemsFilter extends React.Component<any , {first: boolean}>{

    constructor(props: any){
        super(props)
        this.state = {
            first : true,
        }
        this.applyFilters = this.applyFilters.bind(this)
    }

    render() {
        return (
            <div className="filters">
                <div className="filters-wrapper" onClick={this.toogleFilter}>
                    <h3 className="filters-title">Filters</h3>
                    <div className="filter-img">
                        <img src="https://mywebicons.ru/i/png/f437f75c80b33a3539ab8aa076e35437.png" alt="arrow-down" width='15px'/>
                    </div>
                </div>
                <div className="filters-content">
                    <h4>Price:</h4>
                    <div className="input">
                        <label htmlFor="from" >From(BYN):</label>
                        <input className="input-from" type="number" name="from" placeholder="0"/>
                    </div>
                    <div className="input">
                        <label htmlFor="before">Before(BYN):</label>
                        <input className="input-before" type="number" name="before" placeholder="1000"/>
                    </div>
                    <h4>Brand:</h4>
                    <div className="filters-brands">
                        {this.getBrands()}
                    </div>
                    <button className='filters-button' onClick={this.applyFilters}>Apply</button>
                </div>
            </div>
        )
    }

    componentDidUpdate(): void {
        if (Object.keys(this.props.firstCall).length > 0 && this.state.first){
            const allLabels :any = document.querySelectorAll('.brandLabel');
            const allCheck :any = document.querySelectorAll('.brandCheck');
            const inputFrom : any = document.querySelector('.input-from');
            const inputBefore : any = document.querySelector('.input-before');
            inputFrom.value = this.props.firstCall.from;
            inputBefore.value = this.props.firstCall.before;
            for (let i = 0; i < allLabels.length; i ++){
                if (this.props.firstCall.brands[allLabels[i].innerText]){
                    allCheck[i].checked = true;
                }
            }
            inputFrom.value = this.props.firstCall.from;
            this.setState({first : false});
        }
    }

    applyFilters(){
        let data :any = { };
        const allLabels :any = document.querySelectorAll('.brandLabel');
        const allCheck :any = document.querySelectorAll('.brandCheck');
        const inputFrom : any = document.querySelector('.input-from');
        const inputBefore : any = document.querySelector('.input-before');
        data.from = inputFrom?.value;
        data.before = inputBefore?.value;
        data.brands = {}; 
        for (let i = 0; i < allLabels.length; i ++){
            if (allCheck[i].checked){
                data.brands[allLabels[i].innerText] = true;
            }else {
                data.brands[allLabels[i].innerText] = false;
            }
        }
        this.props.getFilters(data)
        
        
    }

    getBrands(){
        let arr : any = new Set([]);
        this.props.items.forEach((el : Item) => {
            arr.add(el.brand)
        });
        let res : any = [];
        arr.forEach((el : String, i : number) => {
            res.push(
                <div className="input" key={i}>
                                <input className='brandCheck' type="checkbox"/>
                                <label className='brandLabel'>{el}</label>
                </div>
            )
        })
        return res;
    }

    toogleFilter(){
        const elem = document.querySelector('.filters-content');
        elem?.classList.toggle('d-block');
    }

}

export default ItemsFilter;