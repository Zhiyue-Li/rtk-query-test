import { useCreateUserMutation, useGetAllUsersQuery } from '../../app/services/user'
import { useState } from 'react'


const Dashboard = () => {

    return (
        <div className="App">
            <UserCreator></UserCreator>
            <br />
            <UserFetcher></UserFetcher>
        </div>
    )
}

const UserCreator = () => {
    const [createUser, { data, error, isLoading }] = useCreateUserMutation()
    const handleClick = async () => {
        await createUser({ name: 'test_user', job: 'test_job' })
    }

    return (
        <div>
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <button>Loading...</button>
            ) : data ? (
                <>
                    {data.name}
                    <br/>
                    {data.job}
                    <br/>
                    {data.id}
                    <br/>
                    <button onClick={handleClick}>Create User</button>
                </>
            ) : (
                <button onClick={handleClick}>Create User</button>
            )}
        </div>
    )
}

const UserFetcher = () => {
    const [skip, setSkip] = useState(true)
    const { data, error, isLoading, isUninitialized, refetch } = useGetAllUsersQuery(undefined, { skip })

    const SkipToggle = () => (
        <>
            <button onClick={() => {
                setSkip(false)
            }}>
                First Fetch
            </button>
            <br/>
            <br/>
            <button onClick={() => {
                refetch()
            }}>
                ReFetch
            </button>
        </>
    )

    return (
        <>
            {error ? (
                <>Oh no, there was an error</>
            ) : isUninitialized ? (
                <div>
                    isUninitialized
                    <br/>
                    <br/>
                    <SkipToggle />
                </div>
            ) : isLoading ? (
                <>isLoading...</>
            ) : data ? (
                <>
                    <div>
                        {data.data.map(user => (
                            <div key={user.id}>
                               {user.id} {user.first_name} {user.last_name}
                            </div>
                        ))}
                    </div>
                    <SkipToggle />
                </>
            ) : null}
        </>
    )
}

export default Dashboard
