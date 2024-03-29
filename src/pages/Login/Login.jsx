import { useState } from "react";
import Button from "../../components/commons/buttons/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __login } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../axios/api";


function Login() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LoginPage, setLoginPage] = useState(true);
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')



  //sonetto id, pass, nickname

  const onSubmitUserData = async (e) => {
    e.preventDefault()
    if (LoginPage) {

      dispatch(__login({ id, password }))
        .then((action) => {
          if (__login.fulfilled.match(action)) {
            navigate('/')
          }
        })
        .catch((error) => {
          alert('로그인 에러', error)
        })
    } else {
      try {
        const { data } = await authApi.post('/register',
          {
            id,
            password,
            nickname,
          }
        )
        if (data.success) {
          setLoginPage(true)
          alert('회원가입 성공!')
          setId('')
          setPassword('')
          setNickname('')
        }
      } catch (error) {
        console.error('가입실패', error.response)
      }
    }
  }

  const onChangeIdData = (e) => {
    setId(e.target.value)
  }
  const onChangePassWordData = (e) => {
    setPassword(e.target.value)
  }
  const onChangeNickNameData = (e) => {
    setNickname(e.target.value)
  }



  return (
    <StMain>
      <StForm onSubmit={onSubmitUserData}>
        {LoginPage ? (
          <StDiv>
            <p>로그인</p>
            <input placeholder="아이디 입력(4~10 자리)"
              minLength={'4'}
              maxLength={'10'}
              value={id}
              onChange={onChangeIdData}
            />
            <input placeholder="패스워드 입력(4~15 자리)"
              minLength={'4'}
              maxLength={'15'}
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
            <input placeholder="아이디 입력(4~10 자리)"
              minLength={'4'}
              maxLength={'10'}
              value={id}
              onChange={onChangeIdData}
            />
            <input placeholder="패스워드 입력(4~15 자리)"
              minLength={'4'}
              maxLength={'15'}
              value={password}
              onChange={onChangePassWordData}
            />
            <input placeholder="닉네임 입력(1~10 자리)"
              minLength={'1'}
              maxLength={'10'}
              value={nickname}
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