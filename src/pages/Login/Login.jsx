import { useState } from "react";
import Button from "../../components/commons/buttons/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LoginPage, setLoginPage] = useState(false);
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickName, setNickName] = useState('')


  const onSubmitUserData = (e) => {
    e.preventDefault()
    if (LoginPage) {
      dispatch(login());
      alert('로그인 성공!')
      navigate('/')
    } else {
      axios.post('https://moneyfulpublicpolicy.co.kr/register'), {
        id, password, nickName
      }



      setLoginPage(true)
      alert('회원가입 성공!')
      setId('')
      setPassword('')
      setNickName('')
    }
  }

  const onChangeIdData = (e) => {
    setId(e.target.value)
  }
  const onChangePassWordData = (e) => {
    setPassword(e.target.value)
  }
  const onChangeNickNameData = (e) => {
    setNickName(e.target.value)
  }



  return (
    <StMain>
      <StForm onSubmit={onSubmitUserData}>
        {LoginPage ? (
          <StDiv>
            <p>로그인</p>
            <input placeholder="아이디 입력"
              value={id}
              onChange={onChangeIdData}
            />
            <input placeholder="패스워드 입력"
              value={password}
              onChange={onChangePassWordData}
            />
            <StDiv3>
              <Button text="로그인">로그인</Button>
            </StDiv3>
            <StBtn>회원가입</StBtn>
          </StDiv>
        ) : (
          <StDiv>
            <p>회원가입</p>
            <input placeholder="아이디 입력"
              value={id}
              onChange={onChangeIdData}
            />
            <input placeholder="패스워드 입력"
              value={password}
              onChange={onChangePassWordData}
            />
            <input placeholder="닉네임 입력"
              value={nickName}
              onChange={onChangeNickNameData}
            />
            <StDiv3>
              <StBtn>회원가입</StBtn>
            </StDiv3>
          </StDiv>
        )}
        <StDiv2>
        </StDiv2>
      </StForm>
    </StMain >
  );
}

export default Login;




const StMain = styled.main`
  background-color: #f5eee6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`

const StForm = styled.form`
  background-color: #f3e1ed;
  display: flex;
  flex-direction: column;
  width: 800px ;
  height: 500px;
  font-size: 1.2rem;
`

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 800px;
  font-size: 1.2rem;
  margin-bottom :20px;
  height: 500px;

  input {
  border: none;
  border-bottom: 1px solid;
  outline: none;
  width: 90%;
  height: 55px;
  display: block;
  gap: 20px;
  }

`

const StDiv2 = styled.div`
  text-align: center;
  width: 100%;
  margin-top:20px;

`
const StDiv3 = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`

const StBtn = styled.button`
  position: relative;
  top: 40px;
  border: none;
  background-color: #5a99d1;
  width: 90%;
  height: 50px;
  font-family: inherit;
  font-size: 1.2rem;
  color: #ffffffc9;
  cursor: pointer;
`