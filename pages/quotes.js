import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCredential, setCredential, checkCredentialExists, clearCredential } from '../helpers/localStorage';
import dayjs from 'dayjs';
import { getData, getDataClientSide } from '../helpers/telegraphRequest';
var relativeTime = require('dayjs/plugin/relativeTime');

const QuotePage = () => {
  const [quotes, setQuotes] = useState();
  const [hasCredential, setHasCredential] = useState(false);
  const [currentCredential, setCurrentCredential] = useState();
  const rt = useRouter();
  dayjs.extend(relativeTime);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      setHasCredential(checkCredentialExists())
      if (hasCredential) {
        
        setCurrentCredential(getCredential());
        const result = await getDataClientSide({}, `https://api.telegra.ph/getPage/${currentCredential.table}?return_content=true`)
        console.log('result:',result)
        setQuotes(result);
      } 
    };

    fetchData()
  }, [])

  

  const generateTableHeader = () => {
    return (
    <thead>
      <tr>
          <th>No</th>
          <th>Quote</th>
          <th>Added</th>
          <th>Actions</th>
      </tr>
    </thead>
    )
  }

  const generateTableContent = (quoteList) => {
    return(
      <tbody> 
      {
        quoteList.map((quote,idx) => {
          let created = dayjs(quote.created_at).fromNow()
          return (
            <tr key={idx + 1}>
              <th>{idx + 1}</th>
              <th>{quote.quote}</th>
              <th>{created}</th>
            </tr>
          )
        })
      }
      </tbody>
    )
  }

  const generateTable = (quoteList) => {
    if (!quoteList || quoteList.length === 0) {
      return (<span><p>Data Not Found</p></span>)
    } else {
      return (
        <table className="pure-table pure-table-horizontal pure-table-striped table-quotes">
          {generateTableHeader()}
          {generateTableContent(quoteList)}
        </table>
      )
    }
  }

  return (
    <>
    <div className="container tables">
    <form>
      <div className="row">
        {generateTable(quotes)}
      </div>

      <div className="row">
      <button className="pure-button pure-button-primary" onClick={() => rt.route('/')}>Back</button>
      </div>
    </form>

    </div>
    </>
  )
}

// export async function getStaticProps() {
//   const quoteList = await getData({});

//   return {
//     props: {
//       quoteList
//     },
//   }
// }

export default QuotePage
