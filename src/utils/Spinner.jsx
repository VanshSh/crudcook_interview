import Spinner from 'react-bootstrap/Spinner'

function SpinnerComp() {
  return (
    <Spinner animation='grow' variant='info'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default SpinnerComp
