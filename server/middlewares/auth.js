export const protect = async (req, res, next) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.json({ success: false, message: "not authenticated" })
        }
          req.userId = userId;    
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

