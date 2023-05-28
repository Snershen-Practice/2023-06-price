const url = "https://hexschool.github.io/js-filter-data/data.json";

const showList = document.querySelector(".showList");
const select = document.querySelector("#js-select");
const filterBtn = document.querySelector(".button-group");

let data = [];
let tempData = [];
axios.get(url).then((res) => {
  console.log(res.data);
  data = res.data;

  filterBtn.addEventListener("click", (e) => {
    console.log(filterBtn.children);
    Array.from(filterBtn.children).forEach((childBtn) => {
      childBtn.classList.remove("btn-type-active");
    });
    e.target.classList.add("btn-type-active");
    categoryFilter(e.target.dataset.type);
    if (tempData.length > 0) {
      renderData(tempData);
    } else {
      showList.innerHTML = `<td colspan="7" class="text-center p-3">請輸入並搜尋想比價的作物名稱^＿^</td>`;
    }
  });
});

function renderData(data) {
  let str = "";
  console.log(data);
  data.forEach((item) => {
    str += `<tr>
    <td width="15%">${item["作物名稱"]}</td>
    <td width="15%">${item["市場名稱"]}</td>
    <td width="14%">
      <div class="inline-flex sort-advanced">
      ${item["上價"]}
        <span>
          <i data-price="上價" data-sort="up" class="fas fa-caret-up"></i>

          <i data-price="上價" data-sort="down" class="fas fa-caret-down"></i>
        </span>
      </div>
    </td>
    <td width="14%">
      <div class="inline-flex sort-advanced">
      ${item["中價"]}
        <span>
          <i data-price="中價" data-sort="up" class="fas fa-caret-up"></i>

          <i data-price="中價" data-sort="down" class="fas fa-caret-down"></i>
        </span>
      </div>
    </td>
    <td width="14%">
      <div class="inline-flex sort-advanced">
      ${item["下價"]}
        <span>
          <i data-price="下價" data-sort="up" class="fas fa-caret-up"></i>

          <i data-price="下價" data-sort="down" class="fas fa-caret-down"></i>
        </span>
      </div>
    </td>
    <td width="14%">
      <div class="inline-flex sort-advanced">
      ${item["平均價"]}
        <span>
          <i data-price="平均價" data-sort="up" class="fas fa-caret-up"></i>

          <i data-price="平均價" data-sort="down" class="fas fa-caret-down"></i>
        </span>
      </div>
    </td>
    <td width="14%">
      <div class="inline-flex sort-advanced">
      ${item["交易量"]}
        <span>
          <i data-price="交易量" data-sort="up" class="fas fa-caret-up"></i>

          <i data-price="交易量" data-sort="down" class="fas fa-caret-down"></i>
        </span>
      </div>
    </td>
  </tr>`;
  });
  showList.innerHTML = str;
}

function categoryFilter(target) {
  tempData = data.filter((item) => {
    return target === item["種類代碼"];
  });
}

function sortUpPrice() {
  data.sort((a, b) => {
    return a - b;
  });
}
