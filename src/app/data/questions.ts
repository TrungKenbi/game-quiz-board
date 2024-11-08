const data = {
  "questions": [
    {
      "id": 1,
      "author": "Claude",
      "question": "Khái niệm chất lượng theo quan điểm của Juran là gì?",
      "options": {
        "A": "Chất lượng là sự phù hợp với yêu cầu",
        "B": "Chất lượng là sự phù hợp với mục đích sử dụng",
        "C": "Chất lượng là sự thỏa mãn khách hàng",
        "D": "Chất lượng là sự không có khuyết tật"
      },
      "correctAnswer": "B"
    },
    {
      "id": 2,
      "author": "Claude",
      "question": "Nguyên tắc nào KHÔNG nằm trong 8 nguyên tắc quản lý chất lượng theo ISO 9000:2015?",
      "options": {
        "A": "Lãnh đạo",
        "B": "Hướng vào khách hàng",
        "C": "Tối đa hóa lợi nhuận",
        "D": "Cải tiến liên tục"
      },
      "correctAnswer": "C"
    },
    {
      "id": 3,
      "author": "Claude",
      "question": "Chu trình PDCA do ai đề xuất?",
      "options": {
        "A": "Walter Shewhart",
        "B": "W. Edwards Deming",
        "C": "Joseph Juran",
        "D": "Philip Crosby"
      },
      "correctAnswer": "A"
    },
    {
      "id": 4,
      "author": "Claude",
      "question": "Công cụ nào sau đây KHÔNG thuộc nhóm 7 công cụ kiểm soát chất lượng cơ bản?",
      "options": {
        "A": "Biểu đồ Pareto",
        "B": "Biểu đồ nhân quả",
        "C": "Ma trận SWOT",
        "D": "Biểu đồ kiểm soát"
      },
      "correctAnswer": "C"
    },
    {
      "id": 5,
      "author": "Claude",
      "question": "Trong quản lý chất lượng toàn diện (TQM), 5S là gì?",
      "options": {
        "A": "5 Stages of Quality",
        "B": "5 Solutions for Problems",
        "C": "5 Standards of Excellence",
        "D": "Seiri, Seiton, Seiso, Seiketsu, Shitsuke"
      },
      "correctAnswer": "D"
    },
    {
      "id": 6,
      "author": "Claude",
      "question": "Phương pháp Six Sigma nhắm đến mục tiêu nào về tỷ lệ sai hỏng?",
      "options": {
        "A": "3.4 lỗi trên một triệu cơ hội",
        "B": "6 lỗi trên một triệu cơ hội",
        "C": "1 lỗi trên một nghìn cơ hội",
        "D": "0.1% tỷ lệ lỗi"
      },
      "correctAnswer": "A"
    },
    {
      "id": 7,
      "author": "Claude",
      "question": "Khái niệm Kaizen trong quản lý chất lượng có nguồn gốc từ đâu?",
      "options": {
        "A": "Mỹ",
        "B": "Nhật Bản",
        "C": "Đức",
        "D": "Anh"
      },
      "correctAnswer": "B"
    },
    {
      "id": 8,
      "author": "Claude",
      "question": "Trong biểu đồ kiểm soát, điểm nằm ngoài giới hạn kiểm soát cho thấy điều gì?",
      "options": {
        "A": "Quá trình đang ổn định",
        "B": "Quá trình có nguyên nhân đặc biệt",
        "C": "Quá trình cần được cải tiến",
        "D": "Quá trình đạt mục tiêu"
      },
      "correctAnswer": "B"
    },
    {
      "id": 9,
      "author": "Claude",
      "question": "Nguyên tắc '80-20' trong biểu đồ Pareto có nghĩa là gì?",
      "options": {
        "A": "80% nguyên nhân tạo ra 20% vấn đề",
        "B": "20% nguyên nhân tạo ra 80% vấn đề",
        "C": "Cần giải quyết 80% vấn đề trước",
        "D": "Cần tập trung 20% nguồn lực"
      },
      "correctAnswer": "B"
    },
    {
      "id": 10,
      "author": "Claude",
      "question": "Phương pháp nào được sử dụng để xác định nguyên nhân gốc rễ của vấn đề?",
      "options": {
        "A": "Phương pháp 5 Why",
        "B": "Phương pháp ABC",
        "C": "Phương pháp XYZ",
        "D": "Phương pháp 123"
      },
      "correctAnswer": "A"
    },
    {
      "id": 11,
      "author": "Claude",
      "question": "Khái niệm 'zero defects' được đề xuất bởi ai?",
      "options": {
        "A": "W. Edwards Deming",
        "B": "Joseph Juran",
        "C": "Philip Crosby",
        "D": "Kaoru Ishikawa"
      },
      "correctAnswer": "C"
    },
    {
      "id": 12,
      "author": "Claude",
      "question": "Trong quản lý chất lượng, SIPOC là viết tắt của các từ nào?",
      "options": {
        "A": "System, Input, Process, Output, Control",
        "B": "Supplier, Input, Process, Output, Customer",
        "C": "Standard, Inspection, Process, Operation, Check",
        "D": "Start, Implement, Process, Optimize, Complete"
      },
      "correctAnswer": "B"
    },
    {
      "id": 13,
      "author": "Claude",
      "question": "Công cụ nào được sử dụng để thu thập ý kiến và sáng tạo trong nhóm?",
      "options": {
        "A": "Biểu đồ kiểm soát",
        "B": "Brainstorming",
        "C": "Histogram",
        "D": "Check sheet"
      },
      "correctAnswer": "B"
    },
    {
      "id": 14,
      "author": "Claude",
      "question": "Trong TQM, khái niệm 'internal customer' đề cập đến ai?",
      "options": {
        "A": "Khách hàng bên ngoài tổ chức",
        "B": "Nhân viên trong cùng tổ chức",
        "C": "Nhà cung cấp",
        "D": "Đối tác kinh doanh"
      },
      "correctAnswer": "B"
    },
    {
      "id": 15,
      "author": "Claude",
      "question": "Phương pháp nào được sử dụng để đo lường khả năng của quá trình?",
      "options": {
        "A": "Chỉ số Cp và Cpk",
        "B": "Biểu đồ Pareto",
        "C": "Biểu đồ nhân quả",
        "D": "Ma trận ưu tiên"
      },
      "correctAnswer": "A"
    },
    {
      "id": 16,
      "author": "Claude",
      "question": "Trong quản lý chất lượng, JIT là viết tắt của khái niệm nào?",
      "options": {
        "A": "Justice In Time",
        "B": "Just In Time",
        "C": "Job Information Technology",
        "D": "Joint Implementation Team"
      },
      "correctAnswer": "B"
    },
    {
      "id": 17,
      "author": "Claude",
      "question": "Mục đích chính của việc xây dựng biểu đồ kiểm soát là gì?",
      "options": {
        "A": "Phân tích chi phí",
        "B": "Kiểm tra sản phẩm cuối cùng",
        "C": "Giám sát và kiểm soát quá trình",
        "D": "Đánh giá nhà cung cấp"
      },
      "correctAnswer": "C"
    },
    {
      "id": 18,
      "author": "Claude",
      "question": "Trong ISO 9001:2015, phương pháp nào được sử dụng để đánh giá rủi ro và cơ hội?",
      "options": {
        "A": "SWOT Analysis",
        "B": "Cost-benefit Analysis",
        "C": "Break-even Analysis",
        "D": "Value Chain Analysis"
      },
      "correctAnswer": "A"
    },
    {
      "id": 19,
      "author": "Claude",
      "question": "Đâu là mục tiêu chính của hoạt động đánh giá chất lượng nội bộ?",
      "options": {
        "A": "Tìm lỗi của nhân viên",
        "B": "Kiểm tra sự tuân thủ và hiệu quả của hệ thống",
        "C": "Giảm chi phí sản xuất",
        "D": "Tăng doanh số bán hàng"
      },
      "correctAnswer": "B"
    },
    {
      "id": 20,
      "author": "Claude",
      "question": "Trong quản lý chất lượng, TPM là viết tắt của khái niệm nào?",
      "options": {
        "A": "Total Project Management",
        "B": "Total Process Management",
        "C": "Total Productive Maintenance",
        "D": "Total Performance Measurement"
      },
      "correctAnswer": "C"
    }
  ]
}


export default data;
