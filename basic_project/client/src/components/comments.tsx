import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";

export const Comments = ({
    postId
}: {
    postId: string
}) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment) return;
        try {
            setLoading(true);
            await axios.post(`http://localhost:8002/posts/${postId}/comments`, {
                content: comment
            });
            fetchComments();
            setComment("");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8002/posts/${postId}/comments`);
            setComments(Object.values(response?.data?.comments) || []);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, []);
    return (
        <>
            <ul>
                {
                    comments?.map((comment, index) => (
                        <li className="text-muted" key={`${comment?.id}-${index}`}>
                            {comment?.content}
                        </li>
                    ))
                }
            </ul>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div className="form-group" >
                    <label htmlFor="comment">New Comment</label>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="form-control" id="comment" placeholder="Enter comment" />
                </div>
                <button disabled={loading} type="submit" className="btn btn-primary">
                    {loading ? "Submittng..." : "Submit"}
                </button>
            </form>
        </>
    )
}