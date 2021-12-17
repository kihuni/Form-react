import {useReducer,useState} from 'react'

const formReducer = (state, e) =>{
  if(e.reset){
   return{
     apple: '',
     count:0,
     name: '',
     'gift-wrap':false,   
    } 
  }
  return{
    ...state,
    [e.name]:e.value
  }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer,{count:100});
  const[submitting, setSubmitting] = useState(false)
  const handleSubmit =(e) =>{
    e.preventDefault();
    setSubmitting(true)

    setTimeout(() =>{
     setSubmitting(false)
    } ,3000)
  }
  const handleChange = (e) =>{
    const isChecked = e.target.type === 'checkbox';
 setFormData({
   name: e.target.name,
   value: isChecked? e.target.checked: e.target.value,
 });
  } 
  return (
    <div className="wrapper">
      <h1>Apples form</h1>
      {submitting && <div>You are submitting the following:
        <ul>
          {Object.entries(formData).map(([name, value])=>(
            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
          ))}
        </ul>
        </div>}
      <form action="" onSubmit={handleSubmit}>
       <fieldset disabled={submitting}>
         <label htmlFor="">Name</label>
         <input name ='name' onChange={handleChange} value = {formData.name || ''}/>
       </fieldset>

       <fieldset disabled={submitting}>
         
           <label>
             <p>Apples</p>
            <select name="apple" onChange={handleChange} value={formData.apple || ''}>
           <option value="">--Please choose an option--</option>
               <option value="fuji">Fuji</option>
               <option value="jonathan">Jonathan</option>
               <option value="honey-crisp">Honey Crisp</option>
             
            </select>
           </label>
           <label>
             <p>Count</p>
             <input type="number" name='count' onChange={handleChange} step='1' value={formData.count|| ''} />
           </label>
           <label>
           <p>Gift Wrap</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} checked={formData['gift-wrap'] || false} disabled={formData.apple !== 'fuji'}/>
         </label>
       </fieldset>
       <button type="submit" disabled={submitting}> submit</button>

      </form>
    </div>
  );
}

export default App;
