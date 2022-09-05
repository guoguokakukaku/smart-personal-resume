import Chart from 'chart.js/auto'

export function drawBar(chartItem: CanvasRenderingContext2D | HTMLCanvasElement): Chart {
  return new Chart(chartItem, {
    type: 'bar',
    data: {
      labels: ['Java', 'JavaScript', 'React', 'TypeScript', 'SQL', 'Android'],
      datasets: [
        {
          label: '単位（月）',
          data: [60, 36, 36, 1, 24, 12],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

export function drawRadar0(chartItem: CanvasRenderingContext2D | HTMLCanvasElement, color: string): Chart {
  const data = {
    labels: ['要件・基本設計', '詳　細　設　計', 'コーディング', '試　験', '運用保守'],
    datasets: [
      {
        label: '熟練度参考値',
        data: [60, 80, 90, 80, 75],
        fill: true,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
      }
    ],
  }
  return new Chart(chartItem, {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  })
}

export function drawRadar1(chartItem: CanvasRenderingContext2D | HTMLCanvasElement, color: string): Chart {
  const data = {
    labels: ['Web情報管理システム', '車載機(Android)', '交　通', 'Androidアプリ', '認証サービス(SAAS)'],
    datasets: [
      {
        label: '熟練度参考値',
        data: [80, 50, 50, 60, 75],
        fill: true,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color,
      }
    ],
  }
  return new Chart(chartItem, {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  })
}
