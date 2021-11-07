import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { getData, insertData } from '../helpers/telegraphRequest'
import { checkCredentialExists } from '../helpers/localStorage'

const IndexPage = ({ quoteList }) => {
  const [quotes, setQuotes] = useState(quoteList)
  const [hasCredential, setHasCredential] = useState(false);

  useEffect(() => {
    setHasCredential(checkCredentialExists())
  }, []) 

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const rt = useRouter();

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
    <>
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
          <button type="submit" className="btn login-btn" disabled={!hasCredential}>
            Add Quote
          </button>
        </div>
        {
          !hasCredential ?
          <>
          <div className="row row-centered">
            <p className="warning-text">
              You need to setup credential first. Click here 
            </p>
          </div>
          <div className="row row-centered">
            <button className="pure-button pure-button-primary" onClick={() => rt.push('/credential')}>Setup Credential</button>
          </div>
          </>
          : null
    }
      </form>
    </div>
    </>
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
