import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getCredential, setCredential, checkCredentialExists, clearCredential } from '../helpers/localStorage'

const IndexPage = ({ quoteList }) => {
  const [inputs, setInputs] = useState({
    apikey: "",
    tablename: "",
    datatitle: ""
  });
  const [hasCredential, setHasCredential] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const rt = useRouter();

  // fetch data
  useEffect(() => {
    setHasCredential(checkCredentialExists())
    let credentials = getCredential()
    setInputs({ 
      apikey: credentials.token,
      tablename: credentials.table,
      datatitle: credentials.title
    })
  }, []) 

  const onSubmit = async ({ apikey, datatitle, tablename }) => {
    setCredential(apikey, tablename, datatitle);
    alert('Your credential has been saved.')
  }

  const deleteCredential = () => {
    clearCredential();
    setInputs({ 
      apikey: "",
      tablename: "",
      datatitle: ""
    })
    alert('Your credential has been cleared.')
  }

  const handleChange = (e) => {
    console.log(e)
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value
    });
  }
  
  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <h3 className="form-header">Credential Input</h3>
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Insert the API key"
            onChange={() => handleChange(this)}
            value={inputs.apikey}
            {...register('apikey', {
              required: { value: true, message: 'API key is required' }
            })}
            className={'form-field' + (errors.apikey ? ' has-error' : '')}
            autoComplete="apikey"
          />
          {errors.apikey && (
            <span className="error-label">{errors.apikey.message}</span>
          )}
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Insert table name"
            onChange={() => handleChange(this)}
            value={inputs.tablename}
            {...register('tablename', {
              required: { value: true, message: 'Table name is required' }
            })}
            className={'form-field' + (errors.tablename ? ' has-error' : '')}
            autoComplete="tablename"
          />
          {errors.tablename && (
            <span className="error-label">{errors.tablename.message}</span>
          )}
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Insert the data title"
            onChange={() => handleChange(this)}
            value={inputs.datatitle}
            {...register('datatitle', {
              required: { value: true, message: 'Data title is required' }
            })}
            className={'form-field' + (errors.datatitle ? ' has-error' : '')}
            autoComplete="datatitle"
          />
          {errors.datatitle && (
            <span className="error-label">{errors.datatitle.message}</span>
          )}
        </div>

        <div className="row">
          <button type="submit" className="btn login-btn">
            Save Credential
          </button>
        </div>
        <div className="row">
          <button className="btn delete-btn" onClick={() => deleteCredential()}>
            Delete Credential
          </button>
        </div>
        <div className="row">
          <button className="pure-button pure-button-primary" onClick={() => rt.back()}>Back</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default IndexPage
