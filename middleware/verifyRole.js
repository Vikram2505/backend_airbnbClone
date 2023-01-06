const verifyRole = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req?.role) return res.status(401).json({status: "Unauthorized"});
        const rolesArray = [...allowedRoles]
        console.log(rolesArray,'received roles');
        console.log(req.role,'request roles');
        const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.status(401).json({status: "Unauthorized"});
        next();
    }
}

export default verifyRole;