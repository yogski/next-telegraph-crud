import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { getData, insertData, updateData, deleteById } from '../helpers/telegraphRequest'

const IndexPage = ({ quoteList }) => {
  const [quotes, setQuotes] = useState(quoteList)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({ quote, apikey, datatitle, tablename }) => {
    const newQuote = {
      id : nanoid(),
      created_at : dayjs().toISOString(),
      quote : quote
    }
    console.log([...quotes, newQuote]);
    const newData = await insertData(apikey, datatitle, tablename, [...quotes, newQuote]);
    console.log(newData);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <h3 className="form-header">My Overheard Quotes</h3>
        </div>
        <div className="row">
          <input
            type="textarea"
            placeholder="What did you hear?"
            {...register('quote', {
              required: { value: true, message: 'Quote is required' }
            })}
            className={'form-field' + (errors.quote ? ' has-error' : '')}
            autoComplete="quote"
          />
          {errors.quote && (
            <span className="error-label">{errors.quote.message}</span>
          )}
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Insert the API key"
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
            Add Quote
          </button>
        </div>
      </form>
    </div>
  )
}

export async function getStaticProps() {
  const quoteList = await getData({});

  return {
    props: {
      quoteList
    },
  }
}

export default IndexPage
