const Results =(props)=>{
    return(
        <div>
            <p>日付：{props.countryData.date.slice(0,10)}</p>
            <p>新規感染者：{props.countryData.newConfirmed.toLocaleString()}</p>
            <p>感染者総数:{props.countryData.totalConfirmed.toLocaleString()}</p>
            <p>新規回復者:{props.countryData.newRecovered.toLocaleString()}</p>
            <p>回復者総数:{props.countryData.totalRecovered.toLocaleString()}</p>
        </div>
    )
}

export default Results