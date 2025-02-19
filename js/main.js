'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 기본 경로
  const baseFolderPath = "https://app.yoons.com/mobile/beflwords/vocanote/";

  // 폴더별 mp3 파일 생성 편의 함수
  const generateFileList = (prefix, ranges) =>
    ranges.map((range) => `${prefix}_${range}.mp3`);

  // 폴더별 파일 목록
  const folderFiles = {
    "Phonics": generateFileList("Phonics", Array.from({ length: 96 }, (_, i) => {
      const start = i * 10 + 1;
      const end = (i + 1) * 10;
      return `${start}~${end}`;
    })),
    "Rookie & Rising Star": [
      // Rookie
      ...generateFileList("Rookie", Array.from({ length: 12 }, (_, i) => {
        const start = i * 20 + 1;
        const end = (i + 1) * 20;
        return `${start}~${end}`;
      })),
      // Rising Star 3
      ...generateFileList("Rising Star 3", Array.from({ length: 16 }, (_, i) => {
        const start = 244 + i * 20;
        const end = 263 + i * 20;
        return `${start}~${end}`;
      })),
      // Rising Star 4
      ...generateFileList("Rising Star 4", Array.from({ length: 16 }, (_, i) => {
        const start = 928 + i * 20;
        const end = 947 + i * 20;
        return `${start}~${end}`;
      })),
    ],
    "All-Star & MVP": [
      // All-Star 5
      ...generateFileList("All-Star 5", Array.from({ length: 15 }, (_, i) => {
        const start = i * 30 + 1;
        const end = (i + 1) * 30;
        return `${start}~${end}`;
      })),
      // All-Star 6
      ...generateFileList("All-Star 6", Array.from({ length: 9 }, (_, i) => {
        const start = 882 + i * 30;
        const end = 911 + i * 30;
        return `${start}~${end}`;
      })),
      // MVP 7
      ...generateFileList("MVP 7", Array.from({ length: 8 }, (_, i) => {
        const start = 1280 + i * 30;
        const end = 1309 + i * 30;
        return `${start}~${end}`;
      })),
    ],
    "중고등 Level 1~2": [
      // Level 1
      ...generateFileList("중고등 Level 1", Array.from({ length: 17 }, (_, i) => {
        const start = i * 30 + 1;
        const end = (i + 1) * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 1", ["511~538"]),
      // Level 2
      ...generateFileList("중고등 Level 2", Array.from({ length: 8 }, (_, i) => {
        const start = 539 + i * 30;
        const end = 568 + i * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 2", ["983~1065"]),
    ],
    "중고등 Level 3~4": [
      // Level 3
      ...generateFileList("중고등 Level 3", Array.from({ length: 20 }, (_, i) => {
        const start = i * 30 + 1;
        const end = (i + 1) * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 3", ["601~612"]),
      // Level 4
      ...generateFileList("중고등 Level 4", Array.from({ length: 16 }, (_, i) => {
        const start = 613 + i * 30;
        const end = 642 + i * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 4", ["1063~1075"]),
    ],
    "중고등 Level 5~6": [
      // Level 5
      ...generateFileList("중고등 Level 5", Array.from({ length: 22 }, (_, i) => {
        const start = i * 30 + 1;
        const end = (i + 1) * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 5", ["751~759"]),
      // Level 6
      ...generateFileList("중고등 Level 6", Array.from({ length: 16 }, (_, i) => {
        const start = 817 + i * 30;
        const end = 846 + i * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 6", ["1507~1514"]),
    ],
    "중고등 Level 7~9": [
      // Level 7
      ...generateFileList("중고등 Level 7", Array.from({ length: 27 }, (_, i) => {
        const start = i * 30 + 1;
        const end = (i + 1) * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 7", ["811~824"]),
      // Level 8
      ...generateFileList("중고등 Level 8", Array.from({ length: 16 }, (_, i) => {
        const start = 825 + i * 30;
        const end = 854 + i * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 8", ["1474~1475"]),
      // Level 9
      ...generateFileList("중고등 Level 9", Array.from({ length: 9 }, (_, i) => {
        const start = 1476 + i * 30;
        const end = 1505 + i * 30;
        return `${start}~${end}`;
      })),
      ...generateFileList("중고등 Level 9", ["1836~1840"]),
    ],
  };

  // HTML 요소 캐싱
  const folderSelect = document.getElementById("folderSelect");
  const audioPlayer = document.getElementById("audioPlayer");
  const currentTrackLabel = document.getElementById("currentTrack");
  const audioList = document.getElementById("audioList");

  let currentFolder = "Phonics";
  let audioFiles = [];
  let currentIndex = 0;

  /**
   * 플레이리스트 UI 업데이트
   */
  const updatePlaylistView = () => {
    audioList.innerHTML = "";
    audioFiles.forEach((file, i) => {
      const li = document.createElement("li");
      li.textContent = file;
      li.addEventListener("click", () => playTrack(i));
      if (i === currentIndex) {
        li.classList.add("active");
      }
      audioList.appendChild(li);
    });
  };

  /**
   * 특정 트랙 재생
   */
  const playTrack = (index) => {
    if (index >= 0 && index < audioFiles.length) {
      currentIndex = index;
      const fileName = audioFiles[currentIndex];
      audioPlayer.src = `${baseFolderPath}${currentFolder}/${fileName}`;
      currentTrackLabel.textContent = `현재 재생 중: ${fileName}`;
      updatePlaylistView();
      audioPlayer.play();
    }
  };

  /**
   * 다음 트랙 재생
   */
  const playNextTrack = () => {
    if (currentIndex + 1 < audioFiles.length) {
      playTrack(currentIndex + 1);
    }
  };

  /**
   * 폴더 변경 시 오디오 리스트 업데이트
   */
  const changeFolder = () => {
    currentFolder = folderSelect.value;
    audioFiles = folderFiles[currentFolder] || [];
    currentIndex = 0;
    updatePlaylistView();
  };

  /**
   * 이벤트 리스너 등록
   */
  const initEventListeners = () => {
    audioPlayer.addEventListener("ended", playNextTrack);
    folderSelect.addEventListener("change", changeFolder);
  };

  /**
   * 초기화
   */
  const init = () => {
    initEventListeners();
    // 첫 로드 시 기본 폴더로 설정
    changeFolder();
  };

  // 모든 초기화 실행
  init();
});
