const userViewModel = require("../viewmodel/userViewModel");
const userView = require("../view/userView");

class UserController {

  async authUserGoogle(req, res){
    try{
      const users = await userViewModel.authUserGoogle(req.body);
      if(users != ""){
        res.status(200).json({
          status: 200,
          data: users,
        });
      }else{
        res.status(202).json({
          status: 202,
          data: "Username or Password is Wrong!"
        });  
      }
    }catch(error){
      res.status(500).send(error.toString());
    }
  }

  async register(req, res){
    try{
      const users = await userViewModel.register(req.body);
      if(users != ""){
        res.status(200).json({
          status: 200,
          data: users,
        });
      }else{
        res.status(202).json({
          status: 202,
          data: "Username or Password is Wrong!"
        });  
      }
    }catch(error){
      res.status(500).send(error.toString());
    }
  }

  async getContent(req, res){
    try{
      const contents = await userViewModel.getContent(req.query.query);
      if(contents != ""){
        res.status(200).json({
          status: 200,
          data: contents,
        });
      }else{
        res.status(202).json({
          status: 202,
          data: "Username or Password is Wrong!"
        });  
      }
    }catch(error){
      res.status(500).send(error.toString());
    }
  }

  async login(req, res){
    try{
      const users = await userViewModel.login(req.body);
      if(users != ""){
        res.status(200).json({
          status: 200,
          data: users,
        });
      }else{
        res.status(202).json({
          status: 202,
          data: "Username or Password is Wrong!"
        });  
      }
    }catch(error){
      res.status(500).send(error.toString());
    }
  }

}

module.exports = new UserController();
