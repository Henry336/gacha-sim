const Courses = ({ courses }) => {
    return (
        <div>
            <table>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>ID: {course.id}</td>
                            <td>Code: {course.code}</td>
                            <td>Course: {course.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Courses