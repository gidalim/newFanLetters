import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/commons/buttons/Button";
import { __editProfile } from "../../redux/modules/authSlice";


function MyPage() {

  const { avatar, nickname, userId } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState('')
  const [selectedImg, setSelectedImg] = useState(avatar);
  const [file, setFile] = useState(null);


  const previewImg = (e) => {
    const imgFile = e.target.files[0]
    if (imgFile.size > 1024 * 1024) {
      return alert('최대 1MB까지 업로드 가능합니다')
    }
    setFile(imgFile)

    const imgUrl = URL.createObjectURL(imgFile)
    setSelectedImg(imgUrl)
  }

  const onEditDone = () => {
    const formData = new FormData();
    if (editingText) {
      formData.append('nickname', editingText)
    }
    if (selectedImg !== avatar) {
      formData.append('avatar', file)
    }
    dispatch(__editProfile(formData))
    setIsEditing(false)
    alert('수정 완료!')

  }

  return (
    <>
      <StSection>
        <Link to='/'>홈버튼</Link>
        <StDiv>
          <StUl>
            <figure>
              <span>프로필관리</span>
              <label>
                <img src={selectedImg}></img>
                <input
                  type="file"
                  onChange={previewImg}
                  accept="image/*" />
              </label>
            </figure>
            {isEditing ?
              <input autoFocus defaultValue={nickname}
                onChange={(e) => setEditingText(e.target.value)}
              />
              : <li>{nickname}</li>}
            <li>{userId}</li>
            {isEditing ? <>
              <StDiv2>
                <Button
                  onClick={() => setIsEditing(false)}>
                  취소
                </Button>
                <Button
                  onClick={onEditDone}
                  disabled={editingText && selectedImg === avatar}
                >수정완료</Button>
              </StDiv2>
            </> :
              <Button onClick={() => setIsEditing(true)}>수정하기</Button>
            }
          </StUl>
        </StDiv>
      </StSection>
    </>
  );
}

export default MyPage;


const StSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 150px;
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: inherit;

    //임시
    &:hover {
      color : #7c63d6;
    }
  }

`

const StUl = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border: 1px solid white;

  label > input{
    display: none;
  }

  figure{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:15px;
    gap: 15px;

    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  input{
    font-size: inherit;
    outline: none;
    height: 24px;
    padding: 6px 12px;
  }
  li{
    display: flex;
    justify-content: center;
    
  }
`

const StDiv = styled.div`
  display: flex;
  background-color: #c3c3c3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 50%;
  border: 1px solid black;
`
const StDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`