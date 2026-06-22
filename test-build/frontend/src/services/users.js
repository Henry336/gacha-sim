import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const baseUrl = base + '/api/users'

/**
 * @description if demo account credentials are detected, intercept the request
 * @param {*} credentials 
 * @returns 
 */
const register = async (credentials) => {
    if (credentials.username === 'User' && credentials.token === '12345') {
        console.warn("SYSTEM OVERRIDE: Demo Mode Activated. Bypassing Backend Registration.")
        
        // Simulate network latency (800ms) for realistic UI loading states
        await new Promise(resolve => setTimeout(resolve, 800))
        
        return {
            _id: 'demo-user-id',
            id: 'demo-user-id', // Critical: Used to intercept future syncs
            username: 'User',
            gachaTokens: 500,
            pet: {
                name: 'Demo Cat',
                level: 10,
                exp: 735,
                requiredExp: 1000,
                stats: { focus: 15, determination: 8 }
            },
            quests: [
                { 
                    canvasId: 'mock-1', 
                    title: 'CS2040S - Mock Problem Set (Graph Theory)', 
                    courseCode: 'CS2040S', 
                    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), 
                    pointsPossible: 15 
                },
                { 
                    canvasId: 'mock-2', 
                    title: 'IS1103 - Mock UI Prototype Submission', 
                    courseCode: 'IS1103', 
                    dueDate: new Date(Date.now() + 86400000 * 4).toISOString(), 
                    pointsPossible: 25 
                }
            ]
        }
    }

    const response = await axios.post(`${baseUrl}/register`, credentials)
    return response.data
}

/**
 * @description if demo account credentials are detected, intercept the request
 * @param {*} userId 
 * @returns 
 */
const sync = async (userId) => {
    if (userId === 'demo-user-id' || !userId) {
        console.warn("SYSTEM OVERRIDE: Demo Sync Intercepted. Bypassing Canvas API.")
        
        // Simulate network latency (600ms)
        await new Promise(resolve => setTimeout(resolve, 600))
        
        // Return refreshed mock state (simulate gaining 50 tokens on sync)
        return {
            message: "Demo sync successful",
            yield: {
                expGained: 150,
                gachaTokens: 550
            },
            quests: [
                { 
                    canvasId: 'mock-1', 
                    title: 'CS2040S - Mock Problem Set (Graph Theory)', 
                    courseCode: 'CS2040S', 
                    dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // Time advanced
                    pointsPossible: 15 
                },
                { 
                    canvasId: 'mock-3', 
                    title: 'CS2100 - Mock Midterm Exam', 
                    courseCode: 'CS2100', 
                    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), 
                    pointsPossible: 40 
                }
            ]
        }
    }

    const response = await axios.post(`${baseUrl}/sync`, {}, {
        headers: {
            'user-id': userId
        }
    })
    return response.data
}

export default { register, sync }