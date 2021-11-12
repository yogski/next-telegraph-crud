import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getCredential, setCredential, checkCredentialExists, clearCredential } from '../helpers/localStorage'

const IndexPage = ({ quoteList }) => {
  const [quotes, setQuotes] = useState(quoteList);
  const [hasCredential, setHasCredential] = useState(false);
  const [currentCredential, setCurrentCredential] = useState({})
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const rt = useRouter();

  // fetch data
  useEffect(() => {
    setHasCredential(checkCredentialExists())
    setCurrentCredential(getCredential());
  }, []) 

  const onSubmit = async ({ apikey, datatitle, tablename }) => {
    setCredential(apikey, tablename, datatitle);
    alert('Your credential has been saved.')
  }

  const deleteCredential = () => {
    clearCredential();
    alert('Your credential has been cleared.')
  }

  return (
    <>
    <div className="container tables">
    <div className="row">
    <table className="pure-table pure-table-horizontal pure-table-striped table-quotes">
    <thead>
        <tr>
            <th>#</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Honda</td>
            <td>Accord</td>
            <td>2009</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Toyota</td>
            <td>Camry</td>
            <td>2012</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Hyundai</td>
            <td>Elantra</td>
            <td>2010</td>
        </tr>
    </tbody>
    </table>
    </div>

    <form>
      <div className="row">
      <button className="pure-button pure-button-primary" onClick={() => rt.route('/')}>Back</button>
      </div>
    </form>

    </div>
    
    {

    }
    </>
  )
}

export default IndexPage
