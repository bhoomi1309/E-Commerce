import './dashboard-style.css';
import { useState, useEffect } from 'react';

function AdminDashboard() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [newBackgroundUrl, setNewBackgroundUrl] = useState('');
<<<<<<< HEAD
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
=======
>>>>>>> b397825 (Commit)

    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
<<<<<<< HEAD
                const response = await fetch('http://localhost:3001/bgs');
=======
                const response = await fetch('https://adaa-web-backend.onrender.com/bgs');
>>>>>>> b397825 (Commit)
                if (!response.ok) {
                    throw new Error('Failed to fetch backgrounds');
                }
                const data = await response.json();
                setImages(data); // Directly set the array of objects (with _id and selected fields)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBackgrounds();
    }, []);


    // Add new background to the server
    const addBackground = async () => {
        if (!newBackgroundUrl.trim()) {
            alert('Please enter a valid URL');
            return;
        }
<<<<<<< HEAD

        try {
            const response = await fetch('http://localhost:3001/bgs/add', {
=======
    
        try {
            const response = await fetch('https://adaa-web-backend.onrender.com/bgs/add', {
>>>>>>> b397825 (Commit)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ URL: newBackgroundUrl }),
            });
<<<<<<< HEAD

            if (!response.ok) {
                throw new Error('Failed to add background');
            }

            const data = await response.json();
            setImages(prevImages => [...prevImages, newBackgroundUrl]);
=======
    
            if (!response.ok) {
                throw new Error('Failed to add background');
            }
    
            const data = await response.json();
    
            // Assuming the response contains the new image data (including _id and selected)
            setImages((prevImages) => [
                ...prevImages,
                { _id: data._id, URL: newBackgroundUrl, selected: false },
            ]);
>>>>>>> b397825 (Commit)
            setNewBackgroundUrl('');
            setShowInput(false);
        } catch (error) {
            console.error('Error adding background:', error);
            setError('Failed to add background');
        }
    };
<<<<<<< HEAD
=======
    
>>>>>>> b397825 (Commit)

    const handleImageSelect = async (index) => {
        const selectedImage = images[index];

        try {
<<<<<<< HEAD
            const response = await fetch('http://localhost:3001/bgs/select', {
=======
            const response = await fetch('https://adaa-web-backend.onrender.com/bgs/select', {
>>>>>>> b397825 (Commit)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedImage._id }), // Use _id for selection
            });

            if (!response.ok) {
                throw new Error('Failed to select background');
            }

            const data = await response.json();

            setImages((prevImages) =>
                prevImages.map((image) => ({
                    ...image,
                    selected: image._id === selectedImage._id,
                }))
            );
        } catch (error) {
            console.error('Error selecting background:', error);
            setError('Failed to select background');
        }
    };


    return (
        <div className="container">
            {/* Add New Background Section */}
            <div className="row mt-4 ms-1">
                <div className="col">
                    <button
                        className="btn btn-primary"
                        style={{
<<<<<<< HEAD
                            backgroundColor: "#007bff",
=======
                            backgroundColor: "#0d47a1",
>>>>>>> b397825 (Commit)
                            color: "#fff",
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => setShowInput(true)}
                    >
                        Add New Background
                    </button>
                </div>
                {showInput && (
                    <div className="col mt-3">
                        <input
                            type="text"
                            placeholder="Enter URL"
                            className="form-control"
                            value={newBackgroundUrl}
                            onChange={(e) => setNewBackgroundUrl(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <button
                            className="btn btn-success mt-2"
<<<<<<< HEAD
=======
                            style={{marginLeft:"32vw"}}
>>>>>>> b397825 (Commit)
                            onClick={addBackground}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            {/* Loading and Error Handling */}
            {loading && <p>Loading backgrounds...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Display Backgrounds */}
            {images.map((image, index) => (
                <div
                    className="row mb-4"
                    key={image._id}
                    onClick={() => handleImageSelect(index)}
                >
                    <div
<<<<<<< HEAD
                        className={`col px-4 ${image.selected ? 'selected' : ''}`}
=======
                        className={`col px-4 ${image.selected ? 'selected-bg' : ''}`}
>>>>>>> b397825 (Commit)
                        style={{
                            backgroundImage: `url(${image.URL})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            margin: '20px',
                            height: '300px',
                            backgroundPosition: 'center 10%',
                            cursor: 'pointer',
<<<<<<< HEAD
                            border: image.selected ? '3px solid #007bff' : 'none',
=======
                            border: image.selected ? '5px solid black' : 'none',
>>>>>>> b397825 (Commit)
                        }}
                    >
                        <div className="mt-5 fs-4">We picked every item with care</div>
                        <div className="mt-2 fw-bold try">You Must Try</div>
                        <button className="btn btn-dark mt-5">
                            Go to collection<i className="fa-solid fa-arrow-right ms-3"></i>
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
}

<<<<<<< HEAD
export default AdminDashboard;
=======
export default AdminDashboard;
>>>>>>> b397825 (Commit)
