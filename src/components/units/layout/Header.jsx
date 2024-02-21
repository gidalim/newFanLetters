import { useDispatch, useSelector } from "react-redux";
import Button from "../../commons/buttons/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/modules/authSlice";

function Header({ selectedBtn, setSelectedBtn }) {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.authSlice.isLoggedin)
  const members = ['카리나', '지젤', '윈터', '닝닝']
  const filteredFanLetter = (selectedPage) => {
    setSelectedBtn(selectedPage)
  }



  const onChangeLogout = () => {
    dispatch(logout());
  }

  return (<>
    <StHeader >
      <StName>
        <Link to='/' >홈버튼</Link>
        <StDiv>
          {isLoggedin ? (
            <>
              <Link to='/mypage'>마이페이지</Link>
              <Link onClick={onChangeLogout}>로그아웃</Link>
            </>
          ) : (
            <>
              <Link to='/login'>로그인하기</Link>
            </>
          )}
        </StDiv>
      </StName>
      <StMember>
        {members.map(member => (
          <Button
            key={member}
            isActive={selectedBtn === member}
            onClick={() => filteredFanLetter(member)}
          >
            {member}
          </Button>
        ))}
      </StMember>
    </StHeader>
  </>
  );
}

export default Header;

const StHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 150px;
  background-color: #f5eee6;
  margin-bottom: 15px;
  gap: 15px;
  `

const StName = styled.h1`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #f5eee6;

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color : #7c63d6;
    }
  }
`
const StMember = styled.h1`
  display: flex;
  justify-content: space-between;
  width: 330px;
  height: 30px;
  gap: 15px;
  padding-bottom: 15px;
`


const StDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap : 20px
`


