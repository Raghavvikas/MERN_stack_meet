export default function Required({errorText}){
    return errorText ? <div className="error">{errorText}</div>:null
}