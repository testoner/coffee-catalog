import React from "react";
import CatalogItem from "../templates/catalog/ItemCard";
import CatalogItems from "../store/catalog";
import '../styles/catalog.scss';
import Pagination from "../templates/common/Pagination";
import ItemsFilter from "../templates/catalog/ItemsFilter";
import RouteParams from "../templates/common/RouteParams";
//import store from '../store/catalog.json';

interface Item {
    id: number,
    name: String,
    brand: String,
    price: Number,
    rate: number,
    comment: Number,
    link: string,
}

class Catalog extends React.Component<{},{showItems: any, currentItems: any, filters: any, firstCall: any}>{

    constructor(props: any){
        super(props)

        this.state={
            currentItems: [],
            showItems: [],
            filters : {},
            firstCall : {},
        }
        this.getFirstFilters = this.getFirstFilters.bind(this);
        this.getFilters = this.getFilters.bind(this);
        this.getShowItems = this.getShowItems.bind(this);
    }
    // If you wont to import data from json file use row under 
    //items  = store;
    items = CatalogItems;

    render() {
        return (
        <main className="main">
            <RouteParams props={this.state.filters} getFirstFilters={this.getFirstFilters}/>
            <h1 className="title">Coffee ({this.items.length})</h1>
            <ItemsFilter items={this.items} getFilters={this.getFilters} firstCall={this.state.firstCall}/>
            <div className="catalog">
                {this.state.showItems.map((el : Item) => (
                <CatalogItem key={el.id} item={el}/>
            ))}
            </div>
            <Pagination length={this.state.currentItems.length} onPage={8} update={this.getShowItems}/>
        </main>
        )
    }
    
    getFirstFilters(data : any){
        let brands : any = {};
        data.brand.forEach((el: any) => {
            brands[el] = true;
        })
        this.setState({firstCall: {from: data.from, before: data.before, brands: brands}})
        this.getFilters({from: data.from, before: data.before, brands: brands})
    }

    componentDidMount(){

        this.setState({currentItems: this.items});
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{ showItems: any; currentItems: any; }>, snapshot?: any): void {
       
        if (prevState.currentItems !== this.state.currentItems){
            this.getShowItems(1);
        }
    }
    
    getFilters(data : any){
        this.setState(() => {return {filters: data}});
        let arr = 
        this.items.filter((el) => {
            let flag = true;
            if (data.from !== ''){
                if (data.from > el.price){
                    flag = false;
                }
            }
            if (data.before !== ''){
                if (data.before < el.price){
                    flag = false;
                }
            }
            let obj : any = Object.values(data.brands);
            if (obj.every((elem : Boolean) => {return !elem}) === false){
                if (!data.brands[el.brand]){
                    flag = false;
                }
            }
            return flag;
    
        })
        this.setState(() => { return {currentItems: arr}});
    }

    getShowItems(newCount : number){ 
        const start  = (newCount * 8) - 8;
        const end = newCount * 8;
        this.setState({showItems : this.state.currentItems.slice(start,end)});
    
    }

}



export default Catalog;