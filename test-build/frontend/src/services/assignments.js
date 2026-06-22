import axios from 'axios'

const base = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const baseUrl = base + '/api/assignments'

const getActive = async (userId) => {
    if (userId === 'demo-user-id' || !userId) {
        console.warn("SYSTEM OVERRIDE: Demo Assignments Intercepted. Bypassing Backend.");
        
        // Simulate network latency (400ms)
        await new Promise(resolve => setTimeout(resolve, 400));
        
        return [
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
            },
            {
                canvasId: 'mock-3',
                title: 'IT2900 - Final Exam',
                courseCode: 'IT2900',
                dueDate: new Date(Date.now()+ 86400000 * 6).toISOString(),
                pointsPossible: 50
            },
            {
                canvasId: 'mock-4',
                title: 'CS2100 - Mock Project Work',
                courseCode: 'CS2100',
                dueDate: new Date(Date.now() + 86400000 * 8).toISOString(),
                pointsPossible: 30
            }
        ];
    }

    const response = await axios.get(baseUrl, {
        headers: {
            'user-id': userId // user id injection in the req's header to be safer
        }
    });
    
    return response.data;
}

export default { getActive }