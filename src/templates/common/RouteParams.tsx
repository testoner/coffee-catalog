import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"


const RouteParams : any = (props : any ) => {
      const [searchParams, setSearchParams] = useSearchParams();
      const [filters, setFilters] = useState({}); 

      let queryParamBrand = searchParams.get('brand') || '';
      let queryParamFrom = searchParams.get('from') || '';
      let queryParamBBefore = searchParams.get('before') || '';

    useEffect(() => {
        if (queryParamBBefore !== '' || queryParamFrom !== '' || queryParamBrand !== ''){
            let data = {
                before: queryParamBBefore === '' ? '' : +queryParamBBefore,
                from: queryParamFrom === '' ? '' : +queryParamFrom,
                brand: queryParamBrand === '' ? [] : queryParamBrand.split(';'),
            } 

            props.getFirstFilters(data)
        }
    }, [])
    useEffect(() => {
        

        if (props.props !== filters){
            setFilters(props.props);
            const from = props.props.from;
            const before = props.props.before;
            let brand = '';
            if (props.props.brands){
                if (Object.keys(props.props.brands).length > 0){
                    let arr = [];
                    for (let key in props.props.brands){
                        if (props.props.brands[key]){
                            arr.push(key);
                        }
                    }
                    brand = arr.join(';');
                }
            }
            if (Object.keys(props.props).length !== 0){
            setSearchParams({from: from, before: before, brand: brand});
            }
        }
        
    })

    return (
        <div>
           
        </div>
    )
}

export default RouteParams;