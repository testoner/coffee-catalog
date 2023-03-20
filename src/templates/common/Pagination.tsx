import React from "react";
import '../../styles/Pagination.scss';

interface Page{
    length: number,
    onPage: number,
    update: any,
}


class Pagination extends React.Component<Page, {active : number}>{
    constructor(props: any){
        super(props)

        this.state = {
            active: 1,
        }
        this.Plus = this.Plus.bind(this);
        this.Minus = this.Minus.bind(this);
    }

    render() {
        return (
            <div className="pagination">
                <button className="pagination-btn" onClick={this.Minus}>Back</button>
                <div className="pagination-text">{`${this.state.active} / ${Math.ceil(this.props.length / this.props.onPage)}`}</div>
                <button className="pagination-btn" onClick={this.Plus}>Next</button>
            </div>
        )
    }

    componentDidUpdate(prevProps: Readonly<Page>, prevState: Readonly<{ active: number; }>, snapshot?: any): void {
        if (prevProps.length !== this.props.length){
            this.setState({active: 1});
        }
    }

    Plus(){
        let length = Math.ceil(this.props.length / this.props.onPage);
        if (this.state.active < length){
            this.setState({active: this.state.active + 1});
            this.props.update(this.state.active + 1);
        }
    }
    Minus(){
        let length = 1;
        if (this.state.active > length){
            this.setState({active: this.state.active - 1});
            this.props.update(this.state.active - 1);
        }
    }

}

export default Pagination;