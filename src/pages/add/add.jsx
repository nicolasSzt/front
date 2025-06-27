import { useState } from 'react'
import { Button } from '@mui/material'
import { fetcher } from '@/helpers/fetcher'
import methods_HTTP from '@/constans/methods'

const CreateChannel = ({ workspaceId }) => {
  const [channel, setChannel] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)


  const addChannel = async () => {
    setLoading(true)

    try {
      const data = await fetcher({
        url: `/api/workspaces/${workspaceId}/channels`,
        method: methods_HTTP.POST,
        body: { name: channel, description }
      })

      if (data.ok) {
        setChannel('')
        setDescription('')
      } else {
        alert('Error al crear el canal')
      }
    } catch (err) {
      alert('Ocurrió un error al crear el canal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add">
      <form className="add__container" onSubmit={e => { e.preventDefault(); addChannel() }}>
        <img src="/logo.png" alt="Logo" />
        <h1>Add New Channel</h1>

        <div className="add__form">
          <input
            name="channel"
            value={channel}
            placeholder="Channel Name"
            onChange={e => setChannel(e.target.value)}
            required
          />
        </div>

        <div className="add__form">
          <input
            name="description"
            value={description}
            placeholder="Channel Description"
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {!loading ? 'Create Channel' : <div id="loading"></div>}
        </Button>
      </form>
    </div>
  )
}

export default CreateChannel