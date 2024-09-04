import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import MessageContext from './MessageContext'
import { useContext } from 'react'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'



const App = () => {

  const [message, dispatch] = useContext(MessageContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () =>{
      dispatch('too short anecdote, must have length 5 or more')
      setTimeout(() =>{dispatch('')}, 5000)
    }
  })

  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate({ content, votes:0 })
    dispatch(`anecdote ${content} added`)
    setTimeout(() =>{dispatch('')}, 5000)
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes:(anecdote.votes + 1)})
    dispatch(`anecdote ${anecdote.content} voted`)
    setTimeout(() =>{dispatch('')}, 5000)
  }

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes,
    retry:1
  })


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if(!result.data){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm newAnecdote={addAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
