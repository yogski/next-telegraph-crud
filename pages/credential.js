import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { getCredential, setCredential, checkCredentialExists } from '../helpers/localStorage'

const IndexPage = ({ quoteList }) => {
  const [quotes, setQuotes] = useState(quoteList);
  const [hasCredential, setHasCredential] = useState(false);
  const [currentCredential, setCurrentCredential] = useState({})
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // fetch data
  useEffect(() => {
    setHasCredential(checkCredentialExists())
    setCurrentCredential(getCredential());
  }, []) 

  const onSubmit = async ({ apikey, datatitle, tablename }) => {
    setCredential(apikey, tablename, datatitle);
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
            value={ hasCredential ? currentCredential.token : null }
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
            value={ hasCredential ? currentCredential.table : null }
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
            value={ hasCredential ? currentCredential.title : null }
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
          <button className="btn delete-btn" onClick={() => {console.log('deleted stuff')}}>
            Delete Credential
          </button>
        </div>
      </form>
    </div>

    {

    }
    </>
  )
}

export default IndexPage
