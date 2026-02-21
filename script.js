const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const allQuestions = [
    
    { type: 'multi_img', 
        isImage: true,
        q: "Đâu là ba thiết bị nhập khi được kết nối với máy tính không có màn hình cảm ứng? (Chọn 3)", 
        a: [IMAGES.cpu_1, 
            IMAGES.printer, 
            IMAGES.screen, 
            IMAGES.mouse,
            IMAGES.headset,
            IMAGES.keyboard], 
            correct: [3, 4, 5] 
    },
    
    { 
        type: 'matching', 
        q: "Quan sát hình ảnh sau để xác định các loại cổng kết nối. Ghép với tên loại cổng kết nối tương ứng: ", 
        left: ["HDMI Port", 
               "Ethernet Port", 
               "Audio Port", 
               "USB Port", 
               "Display Port"], 
        right: ["hdmi", 
                "vga", 
                "audio", 
                "ethernet", 
                "usbport"],
        correct: {0:0, 1:3, 2:2, 3:4, 4:1}
    },
    { 
        type: 'matching', 
        q: "Bạn cần xác định mục đích của các công cụ trình duyệt Web phổ biến. Để trả lời, hãy di chuyển từng công cụ từ danh sách ở bên phải sang hành động tương ứng ở bên trái.", 
        left: ["Hiển thị lại một trang web đã “truy cập trước đó", 
               "Tải lại trang web hiện tại", 
               "Liệt kê các trang web bạn đã truy cập gần đây", 
               "Hiển thị URL của trang web hiện tại"], 
        right: ["Address box", 
                "Refresh button", 
                "History", 
                "Back button"],
        correct: {0:3, 1:1, 2:2, 3:0}
    },
    {
        type: 'matrix',
        q: "Hãy chọn nhà sản xuất tương ứng cho mỗi hệ điều hành:",
        rows: ["iOS", "Windows 11", "Android", "macOS", "ChromeOS"], // Danh sách bên trái
        cols: ["Apple", "Microsoft", "Google"], // Danh sách cột bên trên
        // Đáp án đúng: row_index: col_index
        correct: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 2 } 
    },
    { 
        type: 'matching', 
        q: "Nối các công cụ bảo mật với mô tả đúng:", 
        left: ["Micro USB", "USB", "USB-C", "Lightning"], 
        right: ["usb", "lightning", "micro", "typec"],
        correct: {0:2, 1:0, 2:3, 3:1}
    },
    { 
        type: 'matching', 
        q: "Nối các công cụ bảo mật với mô tả đúng:", 
        left: ["Bộ xử lý trung tâm (CPU)", "Ổ đĩa cứng", "Ổ cứng thể rắn", "Bo mạch chủ"], 
        right: ["cpu", "disk", "hard", "mainboard"],
        correct: {0:0, 1:1, 2:2, 3:3}
    },
    { type: 'single', q: "Bạn cần lưu danh sách các trang Web để có thể dễ dàng quay trở lại vào lần sau. Bạn nên sử dụng tính năng nào của trình duyệt Web?", a: ["Duyệt đa trang một lúc", "Lịch sử hoặc Dòng thời gian", "Mục yêu thích hoặc Dấu trang", "Hộp địa chỉ"], correct: [2] },
    { type: 'single', q: "Lịch sử duyệt web và các trang Web được đánh dấu trang cung cấp cho hacker một bản đồ của tất cả các trang Web mà người dùng truy cập. Cùng với các trang Web thường xuyên truy cập, hacker có thể sử dụng gì để truy cập vào tài khoản nếu mật khẩu được lưu vào thiết bị bị tấn công?", a: ["Settings", "Cookies", "History", "Cutouts"], correct: [1] },
    { type: 'single', q: "Một trong những giáo viên của bạn nói rằng bạn nên thay đổi cài đặt trình duyệt của mình để duyệt Web ở chế độ riêng tư. Vậy lợi ích của việc duyệt Web ở chế độ riêng tư là gì?", a: ["Không thể nhìn thấy các gói được gửi/nhận qua mạng trường học của bạn.", "Tên của bạn được giữ kín.", "Đăng nhập máy tính và mật khẩu của bạn bị vô hiệu hóa. ", "Không có lịch sử, cookie, mật khẩu hoặc tệp tạm thời nào được ghi lại trên máy tính."], correct: [3] },
    { type: 'single', q: "Bạn hãy cho biết, duyệt web riêng tư đảm bảo điều gì sau đây?", a: ["Lịch sử của người dùng không được lưu trữ ", "Có nhiều dung lượng lưu trữ hơn trên máy tính.", "Mật khẩu không cần thay đổi.", "Thông tin tài khoản được lưu"], correct: [0] },
    { type: 'single', q: "Đâu là lợi ích của việc duyệt Web 'ở chế độ riêng tư' hoặc 'ẩn danh'?'", a: ["Cookie sẽ không báo cáo thông tin về bạn cho bên thứ ba ", "Những người khác sẽ không biết được các hoạt động duyệt web của bạn dù sử dụng cùng một thiết bị", "Trình duyệt web của bạn chặn quảng cáo", "Không thể sử dụng vân tay kỹ thuật số để theo dõi các hoạt động trên trình duyệt của bạn"], correct: [1] },
    { type: 'inout', q: "Xác định đúng chức năng của các thiết bị sau:", rows: [" Keyboard.", "Scanner.", "Webcam.", "Microphone.", "Printer."], correct: [true, false, true, true, false] },
    { type: 'single', q: "Người dùng có thể tắt tính năng lưu trữ mật khẩu trực tuyến ở đâu?", a: ["Trong hộp thư đến", "Trong lịch sử của họ", "Trong cài đặt trình duyệt của họ", "Trong cài đặt máy tính của họ"], correct: [2] },
    { type: 'multi', q: "Khi nào người dùng nên cân nhắc việc thay đổi mật khẩu của họ? (Chọn 3)", a: ["Họ đã được thông báo rằng có quyền truy cập trái phép vào tài khoản của họ", "Họ đã cập nhật mật khẩu của họ gần đây", "Họ đã không thay đổi mật khẩu của họ trong một thời gian dài ", "Khi họ muốn đóng tài khoản của mình", "Phần mềm độc hại đang chạy trên máy tính của họ"], correct: [0, 2, 4] },
    { type: 'multi', q: "Bạn cần đảm bảo an toàn cho mật khẩu của mình. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)", a: ["Sử dụng mật khẩu dựa trên thông tin riêng tư cá nhân", "Sử dụng mật khẩu khác nhau cho mỗi tài khoản", "Sử dụng mật khẩu phức tạp và ghi vào một cuốn sổ mà bạn luôn mang theo bên mình", "Sử dụng mật khẩu dài nhất hoặc cụm mật khẩu được hệ thống mật khẩu cho phép", "Sử dụng các từ có thể tìm thấy trong từ điển của một ngôn ngữ khác với ngôn ngữ chính của bạn", "Sử dụng xác thực đa yếu tố, nếu có"], correct: [1, 3, 5] },
    { type: 'multi', q: "Làm cách nào để người dùng có thể bảo vệ mật khẩu của mình một cách tốt nhất? (Chọn 3)", a: ["Thay đổi mật khẩu thường xuyên", "Tạo mật khẩu mới cho mọi tài khoản", "Sử dụng cùng một mật khẩu cho tất cả các tài khoản", "Giữ bí mật mật khẩu", "Sử dụng số thứ tự trong mật khẩu"], correct: [0, 1, 3] },
    { type: 'multi', q: "Đâu là hai hành động bạn có thể thực hiện để giúp duy trì quyền riêng tư kỹ thuật số của bản thân? (Chọn 2)", a: ["Chỉ sử dụng Email trường học của bạn để gửi thông tin cá nhân", "Tắt GPS trên thiết bị của bạn khi không sử dụng thường xuyên", "Định cấu hình cài đặt trình duyệt web của bạn để chặn Cookie", "Lưu trữ tài liệu cá nhân của bạn trên vị trí lưu trữ đám mây"], correct: [1, 2] },
    { type: 'table', q: "Bạn cần xác định các tính năng tiêu chuẩn của thanh tác vụ trong Hệ điều hành Windows. Với mỗi câu phát biểu, hãy chọn Có nếu có thể thực hiện hành động từ thanh tác vụ hoặc chọn Không nếu không thể.", rows: ["Khởi động trình quản lý tác vụ", "Điều chỉnh âm lượng đầu ra âm thanh", "Hiển thị cài đặt kết nối mạng","Thu nhỏ tất cả các chương trình đang mở để hiển thị"], correct: [true, true, true, true] },
    { type: 'multi', q: "Bạn cần tạo một mật khẩu mạnh. Đâu là ba nguyên tắc bạn cần tuân thủ? (Chọn 3)", a: ["Bao gồm chữ viết hoa và chữ viết thường", "Bao gồm các số dễ nhớ như ngày sinh và số điện thoại", "Bao gồm họ hoặc tên của bạn", "Bao gồm thông tin cá nhân như tên người trong gia đình hoặc tên vật nuôi","Bao gồm các chữ cái, chữ số và ký hiệu","Sử dụng tám ký tự trở lên"], correct: [0, 4, 5] },
    { type: 'table', 
        q: "Bạn cần xác định các chức năng do Hệ điều hành của máy tính quản lý. Với mỗi tác vụ dưới đây, hãy chọn Đúng nếu đó là tác vụ do Hệ điều hành quản lý và chọn sai nếu không phải.", 
        rows: ["Chỉnh sửa tập tin văn bản", 
            "Tìm kiếm trên Internet", 
            "Cấp phát tài nguyên phần cứng",
            "Giao tiếp với các thiết bị ngoại vi"], 
        correct: [false, false, true, true] 
    },


    { type: 'multi', 
        q: "Điều nào đúng với Hệ điều hành Linux? (Chọn 3)", 
        a: ["Độc quyền", 
            "Không thể được sử dụng trên bất cứ thứ gì ngoại trừ các thiết bị di động", 
            "Có thể chạy trên mọi phần cứng", 
            "Người dùng có thể sửa đổi phần mềm thông qua mã nguồn của chương trình",
            "Có tính bảo mật cao"], 
            correct: [2, 3, 4] 
    },

    { type: 'single', 
        q: "Máy tính để bàn sử dụng phần cứng nào để lưu trữ dữ liệu lâu dài?", 
        a: ["Bộ xử lý trung tâm (CPU)", 
            "Ổ đĩa Flash USB", 
            "Bo mạch chủ", 
            "Ổ đĩa cứng"], 
            correct: [3] 
    },

    { type: 'multi', 
        q: "Bạn dự định mua một thiết bị máy tính cầm tay. Thiết bị phải có khả năng chạy bằng pin và phải được trang bị bàn phím vật lý tích hợp. Đâu là hai thiết bị đáp ứng được những yêu cầu trên? (Chọn 2)", 
        a: ["Máy tính xách tay chạy Windows", 
            "Máy tính để bàn Mac", 
            "Máy tính đa năng chạy Windows", 
            "Điện thoại thông minh chạy Android",
            "Máy tính bảng chạy Android",
            "Chromebook"], 
            correct: [0, 5] 
    },    

    { type: 'serviceandsystem', 
        q: "Với mỗi loại phần mềm, hãy xác định xem đó là Phần mềm Hệ thống hay Phần mềm Ứng dụng.", 
        rows: ["Trình duyệt Web", 
               "Bộ phát đa phương tiện", 
               "Trình điều khiển card đồ họa",
               "Trình quản lý phân vùng ổ đĩa"], 
        correct: [ true, true, false, false] 
    },

    { type: 'table', 
        q: "Với mỗi câu phát biểu về sự khác biệt giữa mạng có dây và không dây, hãy chọn Đúng hoặc Sai.", 
        rows: ["Kết nối Wi-Fi được mã hóa an toàn hơn so với kết nối Ethernet", 
            "Kết nối Wi-Fi thường ít xảy ra độ trễ khi truyền dữ liệu hơn so với kết nối Ethernet", 
            "Kết nối Ethernet thường cung cấp tốc độ kết nối mạng nhanh hơn kết nối Wi-Fi"],
        correct: [false, false, true] 
    },

    { type: 'single', 
        q: "Thiết bị nào chuyển đổi dữ liệu từ kỹ thuật số (Digital) sang tương tự (Analog) và ngược lại để truyền tín hiệu qua mạng?", 
        a: ["Router", 
            "Ethernet Cable", 
            "Network Adapter", 
            "Modem"], 
            correct: [3] 
    },

    { type: 'single', 
        q: "Loại cáp nào có thể truyền dữ liệu lên đến 480 megabit/giây?", 
        a: ["USB", 
            "USB-C", 
            "Micro USB", 
            "Lightning connecter"], 
            correct: [3] 
    },

    { type: 'table', 
        q: "Với mỗi câu phát biểu về những lợi ích của cơ sở hạ tầng mạng chất lượng, hãy chọn Đúng hoặc Sai.", 
        rows: ["Đảm bảo rằng học sinh có thể kết nối thông suốt với mạng của nhà trường", 
            "Cho phép học sinh kết nối với phòng máy tính của nhà trường từ mọi nơi", 
            "Mạng nội bộ không giới hạn số lượng người dùng và bất kỳ ai cũng có thể truy cập được"],
        correct: [ true, false, true] 
    },

    { type: 'multi', 
        q: "Ba phát biểu nào dưới đây đúng với phần mềm nguồn mở? (Chọn 3)", 
        a: ["Nó an toàn hơn phần mềm độc quyền", 
            "Nó kém an toàn hơn phần mềm độc quyền", 
            "Giấy phép của nó là trung lập về công nghệ", 
            "Nó cho phép người dùng sửa đổi phần mềm để phù hợp với nhu cầu cụ thể của họ",
            "Nó thân thiện với người dùng hơn phần mềm độc quyền"], 
            correct: [0, 2, 3] 
    },  

    { type: 'table', 
        q: "Với mỗi câu phát biểu về sự khác biệt giữa Internet và mạng nội bộ, hãy chọn Đúng hoặc Sai.", 
        rows: ["Internet thuộc quyền sở hữu riêng của các tổ hợp công ty liên doanh ", 
            "Kết nối nội bộ an toàn hơn so với kết nối Internet ", 
            "Hỗ trợ mở rộng hệ thống mạng của nhà trường mà không cần thiết kế lại khi số lượng học sinh tăng lên"],
        correct: [ false, true, true] 
    },

    { type: 'multi', 
        q: "Ba phát biểu nào dưới đây đúng với phần mềm độc quyền? (Chọn 3)", 
        a: ["Nó kém an toàn hơn phần mềm nguồn mở", 
            "Nó dễ bị phần mềm độc hại tấn công hơn phần mềm nguồn mở", 
            "Giấy phép của nó là trung lập về công nghệ", 
            "Nó cho phép người dùng sửa đổi phần mềm để phù hợp với nhu cầu cụ thể của họ",
            "Nó thân thiện với người dùng hơn phần mềm nguồn mở"], 
            correct: [0, 1, 4] 
    },  

    { type: 'single', 
        q: "Đâu là câu phát biểu đúng về các ứng dụng dựa trên môi trường Web?", 
        a: ["Bạn phải có kết nối Internet để sử dụng ứng dụng Web", 
            "Phiên bản Web của ứng dụng dành cho máy tính để bàn sở hữu tất cả các tính năng giống như phiên bản trên máy tính để bàn", 
            "Các ứng dụng Web xử lý cục bộ thông tin trên máy tính của bạn", 
            "Trước khi có thể sử dụng ứng dụng Web, bạn phải cài đặt ứng dụng đó trên máy tính của mình"], 
            correct: [0] 
    },  

    { type: 'table', 
        q: "Với mỗi câu phát biểu về phần mềm mã nguồn mở, hãy chọn Đúng hoặc Sai:", 
        rows: ["Tất cả phần mềm miễn phí đều là phần mềm mã nguồn mở", 
            "Bất kỳ ai cũng có thể kiểm tra, sửa đổi và cải tiến mã nguồn của phần mềm mã nguồn mở", 
            "Bạn phải đồng ý với Thỏa thuận cấp phép Người dùng cuối trước khi sử dụng phần mềm mã nguồn mở"],
        correct: [ false, true, false] 
    },

    { 
        type: 'matching', 
        q: "Ghép từng loại ứng dụng phần mềm với mục đích tương ứng:", 
        left: ["Hệ thống quản lý cơ sở dữ liệu", 
               "Phần mềm xử lý văn bản", 
               "Phần mềm trình chiếu", 
               "Trình duyệt web", 
               "Ứng dụng bảng tính"], 
        right: ["Sắp xếp, phân tích cũng như lưu trữ dữ liệu số và văn bản, tính toán và hiển thị dữ liệu dưới dạng biểu đồ", 
                "Hiển thị văn bản, hình ảnh và thông tin đa phương tiện dưới dạng trình chiếu điện tử", 
                "Truy cập thông tin trên internet", 
                "Lưu trữ, sắp xếp, điều khiển và điều chỉnh các tập hợp thông tin liên quan", 
                "Nhập, chỉnh sửa, định dạng và xuất văn bản ở định dạng tài liệu"],
        correct: {0:3, 1:4, 2:1, 3:2, 4:0}
    },

    { type: 'single', 
        q: "Loại USB nào có đầu nối có thể đảo ngược khi sử dụng?", 
        a: ["Micro USB", 
            "USB-C", 
            "USB", 
            "Lightning connecter"], 
            correct: [1] 
    },  

    { type: 'single', 
        q: "Bạn đang gặp khó khăn khi gửi và nhận thông tin. Làm cách nào bạn có thể xác định xem thiết bị của mình có được kết nối với Internet hay không?", 
        a: ["Hãy thử gửi một tin nhắn", 
            "Mở trình duyệt", 
            "Tải xuống ứng dụng Speedtest", 
            "Thử lưu một tập tin"], 
            correct: [1] 
    },  

    { 
        type: 'matching', 
        q: "Bạn đang gặp khó khăn khi gửi và nhận thông tin. Làm cách nào bạn có thể xác định xem thiết bị của mình có được kết nối với Internet hay không?", 
        left: ["Ổ cứng thể rắn", 
               "Ổ đĩa flash USB", 
               "Ổ cứng di động", 
               "Ổ đĩa cứng"], 
        right: ["Thiết bị lưu trữ dữ liệu bên ngoài gọn nhẹ, sử dụng bộ nhớ flash", 
                "Thiết bị lưu trữ dữ liệu bên trong giúp lưu trữ và truy xuất dữ liệu bằng bộ nhớ flash", 
                "Thiết bị lưu trữ dữ liệu cơ điện tử bên trong giúp lưu trữ và truy xuất dữ liệu bằng đĩa từ quay nhanh", 
                "Thiết bị lưu trữ dữ liệu bên ngoài hoạt động dựa trên kết nối USB với máy tính"],
        correct: {0:1, 1:0, 2:1, 2:3, 3:2}
    },


    { type: 'table', 
        q: "Bạn cần xác định thông tin nhận dạng cá nhân (PII - Personally Iden-tifiable Information) mà bạn không nên để lộ trên mạng. Với mỗi câu phát biểu, hãy chọn Có nếu đó là thông tin nhận dạng cá nhân hoặc không nếu không phải.", 
        rows: ["Màu mắt", 
            "Ngày sinh", 
            "Nơi sinh"],
        correct: [ false, true, true] 
    },

    { type: 'multi', 
        q: "Bốn điều nào được coi là thông tin nhận dạng cá nhân PII-Personally Indentifiable Information?(Chọn 4)", 
        a: ["Số an sinh xã hội", 
            "Địa chỉ gửi thư", 
            "Kích thước quần áo", 
            "Màu tóc",
            "Lịch sử quét sinh trắc học",
            "Địa chỉ IP"], 
            correct: [0, 1, 4, 5] 
    }, 
    
    { type: 'table', 
        q: "Với mỗi câu phát biểu, hãy chọn Đúng nếu đó là ví dụ về bắt nạt trên mạng hoặc Sai nếu không phải", 
        rows: ["A Liên tục gửi những tin nhắn ác ý riêng cho B", 
            "C Đăng tải một ý kiến gây tranh cãi trên một diễn đàn trực tuyến công khai", 
            "D Đăng ảnh riêng tư của E lên mạng mà không có sự cho phép của cô",
            "F tạo một tài khoản Instagram để đăng tải những tin đồn về các học sinh trong trường"],
        correct: [true, false, true, false] 
    },

    { type: 'single', 
        q: "Cách an toàn để gửi thông tin nhận dạng cá nhân (PII - Personally Identifiable Information) qua Email là gì?", 
        a: ["Bằng cách chỉ gửi Email PII cho người thân", 
            "Bằng cách mã hóa Email", 
            "Không bao giờ gửi Email", 
            "Bằng cách giải mã một Email"], 
            correct: [1] 
    },  

    { type: 'table', 
        q: "Với mỗi câu phát biểu, hãy chọn Đúng hoặc Sai.", 
        rows: ["Bạn sẽ bị quy vào tội đạo văn nếu không trích dẫn nguồn đầy đủ", 
            "Trong tác phẩm viết, bạn phải sử dụng phần chú thích cuối trang để trích dẫn nguồn", 
            "Bạn có thể mạo nhận tác phẩm hoặc ý tưởng của người khác làm của riêng mình mà không cần trích dẫn nguồn",
            "Bạn chỉ phải trích dẫn nguồn khi sử dụng câu văn chính xác như trong tác phẩm gốc của người khác"],
        correct: [true, true, false, false] 
    },

    { type: 'table', 
        q: "Với mỗi câu phát biểu về các phương pháp trích dẫn, hãy chọn Đúng hoặc Sai.", 
        rows: ["Bạn phải trích dẫn nguồn nếu trích dẫn trực tiếp từ một bài phát biểu", 
            "Bạn phải trích dẫn nguồn nếu diễn đạt lại bài viết của một người khác ", 
            "Bạn phải trích dẫn nguồn nếu tóm tắt bài viết của một người khác ",
            "Bạn nên đặt dấu ngoặc kép xung quanh các cụm từ gồm ba từ trở lên được trích dẫn từ bài viết của một người khác"],
        correct: [true, true, true, true] 
    },


    { type: 'multi', 
        q: "Đâu là ba yếu tố phải có trong trích dẫn về một cuốn sách đã xuất bản? (Chọn 3)", 
        a: ["Tên tác giả", 
            "Tên sách", 
            "Ngày xuất bản", 
            "Ngày truy cập",
            "Tình trạng bản quyền",
            "Tình trạng thương hiệu"], 
            correct: [0, 1, 2] 
    },

    { type: 'table', 
        q: "Là một người sử dụng máy tính có đạo đức, trách nhiệm của bạn là phải luôn tuân thủ các quy tắc hành xử đúng mực trên mạng. Bạn cần xác định những ví dụ về cách hành xử đúng mực trên mạng trong môi trường làm việc văn phòng. Với mỗi câu phát biểu, hãy chọn Có nếu đó là ví dụ về cách hành xử đúng mực hoặc Không nếu Không phải..", 
        rows: ["Luôn Cc cho đồng nghiệp khi gửi email để giúp họ nắm được thông tin", 
            "Chia sẻ các tập tin lớn từ dịch vụ lưu trữ đám mây hoặc vị trí máy chủ thay vì đính kèm trong email", 
            "Áp dụng các tiêu chuẩn và giá trị trong các tương tác trực tuyến tương tự như khi bạn tương tác trực tiếp "],
        correct: [false, true, true] 
    },

];

let state = {
    bird: { x: 150, y: 0, velocity: 0, gravity: 0.25, jump: -5.5, angle: 0 },
    pipes: [], clouds: [], mode: 'start',
    score: 0, correct: 0, wrong: 0, qIndex: 0, deaths: 0,
    tempSelections: [], lastPassedPipeY: null, lastAnswerCorrect: false,
    matchLeft: null, matchPairs: {}
};

const PIPE_GAP = 180;
const PIPE_DISTANCE = 350;

function init() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    for(let i=0; i<6; i++) state.clouds.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height*0.5, s: 0.5+Math.random()});
    state.bird.y = canvas.height / 2;
    loop();
}


function startGame() {
    state.mode = 'wait'; // chuyển sang chế độ chờ
    const qTotalEl = document.getElementById('qTotal');
    if (qTotalEl) qTotalEl.innerText = allQuestions.length;
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameHUD').classList.remove('hidden');
    document.getElementById('resumeHint').classList.remove('hidden'); // hiện chữ nhấn SPACE
    spawnPipesInitial();
    updateHUD();

    // Reset vị trí chim
    state.bird.y = canvas.height / 2;
    state.bird.velocity = 0;
}
function spawnPipesInitial() {
    state.pipes = [];
    for(let i = 0; i < 3; i++) {
        let h = Math.random()*(canvas.height-PIPE_GAP-200)+100;
        state.pipes.push({ x: canvas.width + (i * PIPE_DISTANCE), top: h, bottom: canvas.height-h-PIPE_GAP, scored: false });
    }
}

function triggerQuestion() {
    if (state.qIndex >= allQuestions.length) {
        showFinalResult();
        return;
    }
    if (state.mode !== 'play' || state.qIndex >= allQuestions.length) return;
    state.deaths++;
    updateHUD();
    state.mode = 'puzzle';
    const modal = document.getElementById('questionModal');
    modal.className = "fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4";
    const qText = document.getElementById('qText');
    qText.className = "text-xl font-bold text-yellow-500 mb-4 text-center leading-tight";
    modal.classList.remove('hidden');
    document.getElementById('qStepHeader').innerText = `TIẾN TRÌNH: ${state.qIndex + 1} / ${allQuestions.length}`;
    const q = allQuestions[state.qIndex];
    document.getElementById('qText').innerText = q.q;
    document.getElementById('feedback').innerText = "";
    const area = document.getElementById('optionsArea'); area.innerHTML = '';
    area.className = "w-full overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar"; 
    area.innerHTML = '';
    const submitBtn = document.getElementById('submitBtn');
    
    // Luôn khóa nút Nộp bài khi bắt đầu câu hỏi mới
    submitBtn.disabled = true;
    submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";

    state.tempSelections = [];
    state.matchPairs = {};
    state.matchLeft = null;
    state.matrixAnswers = {}; // THÊM DÒNG NÀY để reset bảng chọn Matrix

    if (q.type === 'single') {
        q.a.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.className = "option-btn border-2 border-white/10 mb-2 p-4 w-full rounded-xl text-left text-white transition-all bg-white/5 hover:bg-white/10"; 
            btn.innerText = ans;
            btn.onclick = () => {
                state.tempSelections = [i];
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('border-yellow-500', 'bg-yellow-500/20'));
                btn.classList.add('border-yellow-500', 'bg-yellow-500/20');
                submitBtn.disabled = false;
                submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
            };
            area.appendChild(btn);
        });
    } else if (q.type === 'multi') {
        q.a.forEach((ans, i) => {
            const div = document.createElement('div');
            div.className = "flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-3 border border-white/10 cursor-pointer hover:bg-white/10 transition-all";
            div.innerHTML = `<input type="checkbox" id="m${i}" value="${i}" class="pointer-events-none"> <span class="text-white text-sm flex-1">${ans}</span>`;
            div.onclick = () => {
                const cb = div.querySelector('input');
                cb.checked = !cb.checked;
                if(cb.checked) div.classList.add('border-yellow-500/50', 'bg-yellow-500/10');
                else div.classList.remove('border-yellow-500/50', 'bg-yellow-500/10');
                
                // KIỂM TRA: Đếm số lượng checkbox đang chọn
                const hasChecked = area.querySelectorAll('input:checked').length > 0;
                submitBtn.disabled = !hasChecked;
                submitBtn.className = hasChecked 
                    ? "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg" 
                    : "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
            };
            area.appendChild(div);
        });
    } else if (q.type === 'table') {
        const container = document.createElement('div');
        container.className = "q-table-container";
        const table = document.createElement('table');
        table.className = "q-table";
        table.innerHTML = `<thead><tr><th class="col-content">Nội dung</th><th class="col-choice">Đúng</th><th class="col-choice">Sai</th></tr></thead><tbody></tbody>`;
        
        q.rows.forEach((row, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row}</td><td class="col-choice"><input type="radio" name="r${i}" value="true"></td><td class="col-choice"><input type="radio" name="r${i}" value="false"></td>`;
            tr.onclick = (e) => {
                // KIỂM TRA: Phải trả lời ĐỦ tất cả các dòng trong bảng mới mở khóa
                const totalRows = q.rows.length;
                const answeredRows = new Set(Array.from(table.querySelectorAll('input:checked')).map(radio => radio.name)).size;
                
                if(answeredRows === totalRows) {
                    submitBtn.disabled = false;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
                } else {
                    submitBtn.disabled = true;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
                }
            };
            table.querySelector('tbody').appendChild(tr);
        });
        container.appendChild(table);
        area.appendChild(container);
    }else if (q.type === 'inout') {
        const container = document.createElement('div');
        container.className = "q-table-container";
        const table = document.createElement('table');
        table.className = "q-table";
        table.innerHTML = `<thead><tr><th class="col-content">Nội dung</th><th class="col-choice">Nhâp</th><th class="col-choice">Xuất</th></tr></thead><tbody></tbody>`;
        
        q.rows.forEach((row, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row}</td><td class="col-choice"><input type="radio" name="r${i}" value="true"></td><td class="col-choice"><input type="radio" name="r${i}" value="false"></td>`;
            tr.onclick = (e) => {
                // KIỂM TRA: Phải trả lời ĐỦ tất cả các dòng trong bảng mới mở khóa
                const totalRows = q.rows.length;
                const answeredRows = new Set(Array.from(table.querySelectorAll('input:checked')).map(radio => radio.name)).size;
                
                if(answeredRows === totalRows) {
                    submitBtn.disabled = false;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
                } else {
                    submitBtn.disabled = true;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
                }
            };
            table.querySelector('tbody').appendChild(tr);
        });
        container.appendChild(table);
        area.appendChild(container);
    }else if (q.type === 'serviceandsystem') {
        const container = document.createElement('div');
        container.className = "q-table-container";
        const table = document.createElement('table');
        table.className = "q-table";
        table.innerHTML = `<thead><tr><th class="col-content">Nội dung</th><th class="col-choice">Phần mềm ứng dụng</th><th class="col-choice">Phần mềm hệ thống</th></tr></thead><tbody></tbody>`;
        
        q.rows.forEach((row, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row}</td><td class="col-choice"><input type="radio" name="r${i}" value="true"></td><td class="col-choice"><input type="radio" name="r${i}" value="false"></td>`;
            tr.onclick = (e) => {
                // KIỂM TRA: Phải trả lời ĐỦ tất cả các dòng trong bảng mới mở khóa
                const totalRows = q.rows.length;
                const answeredRows = new Set(Array.from(table.querySelectorAll('input:checked')).map(radio => radio.name)).size;
                
                if(answeredRows === totalRows) {
                    submitBtn.disabled = false;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
                } else {
                    submitBtn.disabled = true;
                    submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
                }
            };
            table.querySelector('tbody').appendChild(tr);
        });
        container.appendChild(table);
        area.appendChild(container);
    } else if (q.type === 'matching') {
        renderMatching(q, area, submitBtn);
    } else if (q.type === 'multi_img') {
        // Thiết lập Grid 2 cột chuyên cho hình ảnh
        area.className = "grid grid-cols-2 gap-4 w-full";
        
        // Reset mảng lựa chọn tạm thời cho câu hỏi mới
        state.tempMultiSelections = []; 

        q.a.forEach((ans, i) => {
            const div = document.createElement('div');
            // Style đồng bộ với match-item (khung viền, bo góc, hiệu ứng hover)
            div.className = "match-item flex items-center justify-center min-h-[120px] p-2 relative border-2 border-white/10 rounded-xl cursor-pointer transition-all bg-white/5 hover:bg-white/10";
            
            // Lấy ảnh Base64 từ mảng q.a và hiển thị
            div.innerHTML = `
                <div class="flex items-center justify-center h-24 w-full p-1 pointer-events-none">
                    <img src="${ans}" class="max-h-full max-w-full object-contain" />
                </div>`;

            div.onclick = () => {
                const idxInArr = state.tempMultiSelections.indexOf(i);
                
                if (idxInArr > -1) {
                    // Nếu đã chọn rồi thì bỏ chọn: xóa màu vàng, xóa dấu tick
                    state.tempMultiSelections.splice(idxInArr, 1);
                    div.classList.remove('border-yellow-500', 'bg-yellow-500/20');
                    const tick = div.querySelector('.tick-icon');
                    if(tick) tick.remove();
                } else {
                    // Nếu chưa chọn thì thêm vào mảng: đổi màu vàng, thêm dấu tick
                    state.tempMultiSelections.push(i);
                    div.classList.add('border-yellow-500', 'bg-yellow-500/20');
                    div.insertAdjacentHTML('beforeend', `
                        <div class="tick-icon absolute top-2 right-2 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm">
                            <i class="fas fa-check"></i>
                        </div>`);
                }
                
                // Cập nhật trạng thái nút Nộp bài (Submit)
                const hasChecked = state.tempMultiSelections.length > 0;
                submitBtn.disabled = !hasChecked;
                submitBtn.className = hasChecked 
                    ? "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg" 
                    : "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
            };
            area.appendChild(div);
        });
    }else if (q.type === 'multi_img') {
        renderMulti(q, area, submitBtn);
    }else if (q.type === 'matrix') {
        renderMatrix(q, area, submitBtn); // Đổi từ questionArea thành area
    }
}
// 1. Hàm bổ trợ hiển thị nội dung (Nhận diện Base64)
function getSimpleContent(content) {
    // Luôn bao bọc trong một div có kích thước cố định để giữ khung hình
    let innerContent = "";

    if (content && typeof content === 'string' && content.startsWith('data:image')) {
        // Cấu trúc cho Ảnh
        innerContent = `<img src="${content}" class="max-h-full max-w-full object-contain" />`;
    } else {
        // Cấu trúc cho Văn bản
        innerContent = `<span class="text-center leading-tight break-words px-2 text-sm font-medium text-white">${content}</span>`;
    }

    // Trả về một container đồng nhất
    return `
    <div class="flex items-center justify-center w-full h-24 pointer-events-none">
        ${innerContent}
    </div>`;
}

// 2. Hàm Render Multi-choice
function renderMulti(q, area, submitBtn) {
    area.innerHTML = '';
    
    // Grid: 2 cột nếu là ảnh, 1 cột nếu là chữ
    const grid = document.createElement('div');
    grid.className = q.isImage ? "grid grid-cols-2 gap-4 w-full" : "flex flex-col gap-2 w-full";

    // Khởi tạo mảng lưu trữ lựa chọn nếu chưa có
    if (!state.tempMultiSelections) state.tempMultiSelections = [];

    q.a.forEach((opt, i) => {
        const item = document.createElement('div');
        const isSelected = state.tempMultiSelections.includes(i);
        
        // Sử dụng style match-item đồng bộ với hàm matching của bạn
        item.className = `match-item ${isSelected ? 'pair-color-0' : 'bg-white/5 border-white/10'} 
                         flex items-center justify-center min-h-[110px] p-2 relative
                         border-2 rounded-xl cursor-pointer transition-all hover:bg-white/10`;

        item.innerHTML = getSimpleContent(opt);

        // Hiển thị icon tích nếu ô đó đang được chọn
        if (isSelected) {
            item.insertAdjacentHTML('beforeend', `
                <div class="absolute top-2 right-2 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm">
                    <i class="fas fa-check"></i>
                </div>
            `);
        }

        // Logic khi click vào ô để chọn nhiều đáp án
        item.onclick = () => {
            const index = state.tempMultiSelections.indexOf(i);
            if (index > -1) {
                state.tempMultiSelections.splice(index, 1); // Bỏ chọn
            } else {
                state.tempMultiSelections.push(i); // Chọn
            }
            renderMulti(q, area, submitBtn); // Vẽ lại giao diện
        };

        grid.appendChild(item);
    });

    area.appendChild(grid);

    // Mở khóa nút Gửi (Submit)
    const hasSelection = state.tempMultiSelections.length > 0;
    submitBtn.disabled = !hasSelection;
    submitBtn.className = hasSelection 
        ? "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg" 
        : "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 cursor-not-allowed";
}


function renderMatrix(q, area, submitBtn) {
    if (!area) return;
    area.innerHTML = '';
    
    // Đảm bảo có nơi lưu trữ đáp án trong state
    if (!state.matrixAnswers) state.matrixAnswers = {};

    const container = document.createElement('div');
    container.className = "w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 mb-4";

    // Cấu trúc: Tên hệ điều hành rộng hơn (2.5 phần), các cột hãng rộng 1 phần
    const gridStyle = `grid-template-columns: 2.5fr repeat(${q.cols.length}, 1fr)`;
    
    // Header bảng
    let html = `
        <div class="grid bg-white/10 border-b border-white/10 shadow-sm" style="${gridStyle}">
            <div class="p-3 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-wider flex items-center">Nội dung</div>
            ${q.cols.map(col => `
                <div class="p-3 text-center text-[10px] md:text-xs font-black text-yellow-500 uppercase flex items-center justify-center leading-tight">
                    ${col}
                </div>
            `).join('')}
        </div>
    `;

    // Các hàng Hệ điều hành
    q.rows.forEach((row, rowIndex) => {
        const isLast = rowIndex === q.rows.length - 1;
        html += `
            <div class="grid ${isLast ? '' : 'border-b border-white/5'} hover:bg-white/5 transition-colors" style="${gridStyle}">
                <div class="p-3 text-sm font-bold text-white flex items-center">${row}</div>
                ${q.cols.map((_, colIndex) => {
                    const isSelected = state.matrixAnswers[rowIndex] === colIndex;
                    return `
                        <div class="p-2 flex justify-center items-center">
                            <div onclick="selectMatrix(${rowIndex}, ${colIndex}, ${state.qIndex})" 
                                 class="w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer
                                 ${isSelected 
                                    ? 'bg-yellow-500 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                                    : 'border-white/20 hover:border-white/50 bg-white/5'}">
                                ${isSelected ? '<div class="w-2.5 h-2.5 bg-black rounded-full"></div>' : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    });

    container.innerHTML = html;
    area.appendChild(container);

    // Hàm xử lý chọn - Đưa vào window để gọi từ HTML string
    window.selectMatrix = (r, c, qIdx) => {
        if (state.qIndex !== qIdx) return; // Bảo vệ nếu chuyển câu quá nhanh
        state.matrixAnswers[r] = c;
        renderMatrix(allQuestions[qIdx], area, submitBtn);
    };

    // Kiểm tra: Phải chọn đủ tất cả các hàng mới mở nút Nộp bài
    const isComplete = q.rows.every((_, idx) => state.matrixAnswers[idx] !== undefined);
    
    if (isComplete) {
        submitBtn.disabled = false;
        submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
    } else {
        submitBtn.disabled = true;
        submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
    }
}

function renderMatching(q, area, submitBtn) {
    area.innerHTML = '';
    
    // Grid chính: 2 cột bằng nhau
    const grid = document.createElement('div');
    grid.className = "grid grid-cols-2 gap-x-4 gap-y-3 w-full"; 
    
    const pairedKeys = Object.keys(state.matchPairs).sort((a,b) => a-b);

    const renderContent = (content) => {
    const imageWrapper = (src) => {
        // Tạo ID ngẫu nhiên để không bị trùng lặp giữa các ô
        const id = 'img-' + Math.random().toString(36).substr(2, 9);
        
        return `
        <div class="flex items-center justify-center h-20 w-full relative">
            <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <img src="${src}" class="max-h-full max-w-full object-contain opacity-20 blur-sm" />
            </div>

            <img src="${src}" 
                 id="${id}"
                 onclick="
                    event.stopPropagation(); 
                    const isZoomed = this.getAttribute('data-zoom') === 'true';
                    if (!isZoomed) {
                        this.setAttribute('data-zoom', 'true');
                        this.classList.add('fixed-center');
                        document.getElementById('${id}-overlay').classList.remove('hidden');
                    } else {
                        this.setAttribute('data-zoom', 'false');
                        this.classList.remove('fixed-center');
                        document.getElementById('${id}-overlay').classList.add('hidden');
                    }
                 "
                 class="relative z-10 max-h-full max-w-full object-contain cursor-zoom-in transition-all duration-300 ease-out outline-none" 
            />
            
            <div id="${id}-overlay" 
                 onclick="
                    event.stopPropagation();
                    const img = document.getElementById('${id}');
                    img.setAttribute('data-zoom', 'false');
                    img.classList.remove('fixed-center');
                    this.classList.add('hidden');
                 "
                 class="hidden fixed inset-0 bg-black/80 z-[9998] cursor-zoom-out">
            </div>

            <style>
                /* Class phóng to ra giữa màn hình */
                .fixed-center {
                    position: fixed !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    height: 50vh !important;
                    width: auto !important;
                    max-width: 50vw !important;
                    z-index: 9999 !important;
                    box-shadow: 0 0 50px rgba(0,0,0,0.9);
                }
            </style>
        </div>`;
    };

    if (typeof IMAGES !== 'undefined' && IMAGES[content]) {
        return imageWrapper(IMAGES[content]);
    }
    if (content.includes('data:image') || content.includes('<img')) {
        const src = content.includes('<img') ? content.match(/src="([^"]+)"/)[1] : content;
        return imageWrapper(src);
    }
    return `<span class="text-center leading-tight break-words w-full px-1 text-sm pointer-events-none">${content}</span>`;
};
    // Duyệt theo số lượng hàng
    for (let i = 0; i < q.left.length; i++) {
        // --- Ô BÊN TRÁI (Cột A) ---
        const leftItem = document.createElement('div');
        const leftPairIdx = pairedKeys.indexOf(i.toString());
        const leftColorClass = leftPairIdx !== -1 ? `pair-color-${leftPairIdx}` : '';
        
        leftItem.className = `match-item ${state.matchLeft === i ? 'waiting' : ''} ${leftColorClass} 
                       flex items-center justify-center min-h-[80px] p-2 
                       border-2 border-white/10 rounded-xl cursor-pointer transition-all`;
        
        leftItem.innerHTML = renderContent(q.left[i]);
        leftItem.onclick = () => {
            if (leftPairIdx !== -1) { delete state.matchPairs[i]; renderMatching(q, area, submitBtn); }
            else { state.matchLeft = i; renderMatching(q, area, submitBtn); }
        };

        // --- Ô BÊN PHẢI (Cột B) ---
        const j = i; // Lấy cùng chỉ số để render ngang hàng
        const rightItem = document.createElement('div');
        const leftKey = Object.keys(state.matchPairs).find(k => state.matchPairs[k] === j);
        const rightPairIdx = leftKey !== undefined ? pairedKeys.indexOf(leftKey) : -1;
        const rightColorClass = rightPairIdx !== -1 ? `pair-color-${rightPairIdx}` : '';
        
        rightItem.className = `match-item ${rightColorClass} 
                       flex items-center justify-center min-h-[80px] p-2 
                       border-2 border-white/10 rounded-xl cursor-pointer transition-all`;
        
        rightItem.innerHTML = renderContent(q.right[j]);
        rightItem.onclick = () => {
            if (leftKey !== undefined) { delete state.matchPairs[leftKey]; renderMatching(q, area, submitBtn); }
            else if (state.matchLeft !== null) {
                state.matchPairs[state.matchLeft] = j;
                state.matchLeft = null;
                renderMatching(q, area, submitBtn);
            }
        };

        // Add cả 2 vào grid (CSS grid-cols-2 sẽ tự xếp chúng nằm ngang nhau)
        grid.appendChild(leftItem);
        grid.appendChild(rightItem);
    }

    area.appendChild(grid);
    
    // Logic khóa/mở nút Submit giữ nguyên 100%
    if (Object.keys(state.matchPairs).length === q.left.length) {
        submitBtn.disabled = false;
        submitBtn.className = "w-full py-4 rounded-xl font-black bg-yellow-500 text-black shadow-lg";
    } else {
        submitBtn.disabled = true;
        submitBtn.className = "w-full py-4 rounded-xl font-black bg-gray-600 text-white/50 transition-all";
    }

}

function checkFinalAnswer() {
    const q = allQuestions[state.qIndex];
    let isCorrect = false;
    if (q.type === 'single') isCorrect = state.tempSelections[0] === q.correct[0];
    else if (q.type === 'multi') {
        const checked = Array.from(document.querySelectorAll('#optionsArea input:checked')).map(el => parseInt(el.value));
        isCorrect = checked.length === q.correct.length && checked.every(v => q.correct.includes(v));
    } else if (q.type === 'table') {
        const res = q.rows.map((_, i) => document.querySelector(`input[name="r${i}"]:checked`)?.value === "true");
        isCorrect = res.every((v, i) => v === q.correct[i]);
    }else if (q.type === 'inout') {
        const res = q.rows.map((_, i) => document.querySelector(`input[name="r${i}"]:checked`)?.value === "true");
        isCorrect = res.every((v, i) => v === q.correct[i]);
    }else if (q.type === 'serviceandsystem') {
        const res = q.rows.map((_, i) => document.querySelector(`input[name="r${i}"]:checked`)?.value === "true");
        isCorrect = res.every((v, i) => v === q.correct[i]);
    } else if (q.type === 'matching') {
        isCorrect = Object.entries(q.correct).every(([k, v]) => state.matchPairs[k] == v);
    }else if (q.type === 'matrix') {
        // Kiểm tra xem mọi hàng trong đáp án đúng có khớp với matrixAnswers không
        isCorrect = Object.entries(q.correct).every(([rowIdx, colIdx]) => {
            return state.matrixAnswers[rowIdx] === colIdx;
        });
    } else if (q.type === 'multi_img') {
        const selected = state.tempMultiSelections || [];
        // Kiểm tra nếu mảng đã chọn khớp hoàn toàn với mảng correct
        isCorrect = selected.length === q.correct.length && 
                    selected.every(v => q.correct.includes(v)) &&
                    q.correct.every(v => selected.includes(v));
                }



    state.lastAnswerCorrect = isCorrect;
    if (isCorrect) state.correct++; else { state.wrong++; state.score = 0; }
    state.qIndex++; updateHUD();
    const fb = document.getElementById('feedback');
    
    // Tạo nội dung thông báo động
    const statusLabel = isCorrect 
        ? `<div class="text-green-400 text-2xl animate-bounce"><i class="fas fa-check-circle"></i> CHÍNH XÁC!</div>` 
        : `<div class="text-red-500 text-2xl animate-pulse"><i class="fas fa-times-circle"></i> SAI RỒI!</div>`;

    fb.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-2 border-t border-white/10 mt-2">
            ${statusLabel}
            <div class="flex gap-6 items-center justify-center w-full">
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 uppercase tracking-tighter">Câu đúng</span>
                    <span class="text-green-500 font-black text-xl">${state.correct}</span>
                </div>
                <div class="w-[1px] h-8 bg-white/10"></div>
                <div class="flex flex-col items-center">
                    <span class="text-[10px] text-gray-400 uppercase tracking-tighter">Câu sai</span>
                    <span class="text-red-500 font-black text-xl">${state.wrong}</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('submitBtn').disabled = true;
    setTimeout(() => {
        document.getElementById('questionModal').classList.add('hidden');
        // KIỂM TRA KẾT THÚC GAME TẠI ĐÂY
        if (state.qIndex >= allQuestions.length) {
            showFinalResult(); // Gọi hàm hiển thị kết quả
            return; // Dừng lại, không hồi sinh chim nữa
        }

        state.matrixAnswers = {};
        if (state.deaths > 0 && state.deaths % 5 === 0) startMiniGame();
        else respawnBird(!state.lastAnswerCorrect);
    }, 1200);
}
// Hàm hiển thị bảng tổng kết
function showFinalResult() {
    state.mode = 'end'; // Chuyển sang chế độ kết thúc
    
    const correct = state.correct;
    const total = allQuestions.length;
    const accuracy = Math.round((correct / total) * 100);

    // Cập nhật các giá trị vào HTML (Đảm bảo bạn đã thêm HTML ở bước dưới)
    if(document.getElementById('finalCorrect')) {
        document.getElementById('finalCorrect').innerText = correct;
        document.getElementById('finalWrong').innerText = state.wrong;
        document.getElementById('finalAccuracy').innerText = accuracy + "%";
        document.getElementById('finalResultModal').classList.remove('hidden');
    } else {
        // Nếu bạn chưa kịp thêm HTML, dùng tạm Alert để test
        alert(`HOÀN THÀNH!\nĐúng: ${correct}\nSai: ${state.wrong}\nTỉ lệ: ${accuracy}%`);
        location.reload();
    }
}

function respawnBird(isReset = false) {
    state.bird.x = 150; state.bird.velocity = 0;
    if (isReset) { state.bird.y = canvas.height / 2; spawnPipesInitial(); }
    else {
        state.bird.y = state.lastPassedPipeY || canvas.height / 2;
        state.pipes = [];
        for(let i = 0; i < 3; i++) {
            let h = Math.random()*(canvas.height-PIPE_GAP-200)+100;
            state.pipes.push({ x: 550 + (i * PIPE_DISTANCE), top: h, bottom: canvas.height-h-PIPE_GAP, scored: false });
        }
    }
    state.mode = 'wait';
    document.getElementById('resumeHint').classList.remove('hidden');
}

function startMiniGame() {
    state.mode = 'minigame';
    const modal = document.getElementById('minigameModal');
    const content = document.getElementById('miniContent');
    modal.classList.remove('hidden'); 
    content.innerHTML = '';
    content.className = ""; // Reset class

    // Lấy chỉ số game dựa trên số mạng (xoay vòng 9 trò)
    const gameIdx = (Math.floor(state.deaths / 5) - 1) % 9;

    const games = [
        { t: "STROOP TEST", d: "Chọn MÀU CỦA CHỮ", f: playStroop },
        { t: "BẢNG SCHULTE", d: "Nhấn nhanh 1 -> 9", f: playSchulte },
        { t: "KIM TỰ THÁP", d: "X = A + B", f: playPyramid },
        { t: "PHẢN XẠ MÀU", d: "Tìm ô màu khác biệt", f: playColorDiff },
        // 5 TRÒ MỚI THÊM
        { t: "SỐ CÒN THIẾU", d: "Tìm quy luật dãy số", f: playNumberSeries },
        { t: "NHỚ VỊ TRÍ", d: "Nhớ và lật các cặp hình", f: playMemoryMatch },
        { t: "TÍNH NHẨM NHANH", d: "Giải phép tính trong 5s", f: playQuickMath },
        { t: "XOAY HÌNH", d: "Tìm mảnh ghép khớp mẫu", f: playPatternMatch },
        { t: "ĐẾM HÌNH", d: "Đếm số hình vuông/tam giác", f: playShapeCount }
    ];

    const g = games[gameIdx];
    document.getElementById('miniTitle').innerText = g.t;
    document.getElementById('miniDesc').innerText = g.d;
    g.f(content);
}

function finishMiniGame() { document.getElementById('minigameModal').classList.add('hidden'); respawnBird(!state.lastAnswerCorrect); }

function playStroop(c) {
    const colors = ["#ef4444", "#3b82f6", "#eab308", "#a855f7"];
    const names = ["ĐỎ", "XANH", "VÀNG", "TÍM"];
    const cI = Math.floor(Math.random()*4), tI = Math.floor(Math.random()*4);
    c.innerHTML = `<div class="w-full text-5xl font-black mb-8" style="color:${colors[cI]}">${names[tI]}</div>`;
    const grid = document.createElement('div'); grid.className = "grid grid-cols-2 gap-4 w-full";
    colors.forEach((col, i) => {
        const b = document.createElement('button'); b.className = "h-16 rounded-xl border-2 border-white/20"; b.style.backgroundColor = col;
        b.onclick = () => { if(i === cI) finishMiniGame(); else startMiniGame(); };
        grid.appendChild(b);
    });
    c.appendChild(grid);
}

function playSchulte(c) {
    let nums = [1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-0.5), next = 1;
    c.className = "grid grid-cols-3 gap-2";
    nums.forEach(n => {
        const b = document.createElement('button'); b.className = "w-16 h-16 bg-white/10 text-2xl font-bold rounded-lg border border-white/20"; b.innerText = n;
        b.onclick = () => { if(n === next) { b.classList.add('bg-green-500'); next++; if(next>9) finishMiniGame(); } };
        c.appendChild(b);
    });
}

function playPyramid(c) {
    const v1 = Math.floor(Math.random()*20), v2 = Math.floor(Math.random()*20);
    c.innerHTML = `<div class="text-white"><div class="text-4xl bg-yellow-600 w-20 h-20 flex items-center justify-center mx-auto rounded font-bold">?</div><div class="flex gap-4 mt-4"><div class="w-16 h-16 bg-white/20 flex items-center justify-center rounded">${v1}</div><div class="w-16 h-16 bg-white/20 flex items-center justify-center rounded">${v2}</div></div><input type="number" id="ans" class="mt-6 p-2 w-24 text-black text-center rounded"></div>`;
    const input = c.querySelector('#ans'); input.focus();
    input.oninput = () => { if(parseInt(input.value) === v1+v2) finishMiniGame(); };
}

function playColorDiff(c) {
    const h = Math.random()*360, rI = Math.floor(Math.random()*16);
    c.className = "grid grid-cols-4 gap-2";
    for(let i=0; i<16; i++){
        const b = document.createElement('div'); b.className = "w-14 h-14 rounded-md cursor-pointer";
        b.style.backgroundColor = `hsl(${h}, 70%, ${i===rI ? 62 : 50}%)`;
        b.onclick = () => { if(i===rI) finishMiniGame(); else startMiniGame(); };
        c.appendChild(b);
    }
}
function playNumberSeries(c) {
    const types = [
        { name: "Cộng", fn: () => { let a=Math.floor(Math.random()*10), d=Math.floor(Math.random()*5)+2; return [a, a+d, a+d*2, a+d*3]; }},
        { name: "Nhân", fn: () => { let a=Math.floor(Math.random()*3)+1, d=2; return [a, a*d, a*d*d, a*d*d*d]; }}
    ];
    const series = types[Math.floor(Math.random()*types.length)].fn();
    const target = series.pop();
    c.innerHTML = `
        <div class="text-3xl font-bold mb-6 text-yellow-400">${series.join(", ")}, ?</div>
        <input type="number" id="ans" class="p-3 w-32 text-black rounded-xl text-center text-2xl" placeholder="?">
    `;
    const input = c.querySelector('#ans'); input.focus();
    input.oninput = () => { if(parseInt(input.value) === target) finishMiniGame(); };
}
function playMemoryMatch(c) {
    let icons = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'].sort(() => Math.random() - 0.5);
    let flipped = [], matched = 0;
    c.className = "grid grid-cols-4 gap-2";
    icons.forEach((icon, i) => {
        const b = document.createElement('button');
        b.className = "w-16 h-16 bg-white/20 text-transparent font-bold rounded-lg border border-white/10 text-xl transition-all";
        b.innerText = icon;
        b.onclick = () => {
            if (flipped.length < 2 && !b.classList.contains('bg-green-500')) {
                b.classList.remove('text-transparent'); b.classList.add('bg-white/40');
                flipped.push({el: b, val: icon});
                if (flipped.length === 2) {
                    if (flipped[0].val === flipped[1].val) {
                        flipped.forEach(f => f.el.classList.add('bg-green-500'));
                        matched++; flipped = [];
                        if (matched === 4) setTimeout(finishMiniGame, 500);
                    } else {
                        setTimeout(() => {
                            flipped.forEach(f => { f.el.classList.add('text-transparent'); f.el.classList.remove('bg-white/40'); });
                            flipped = [];
                        }, 500);
                    }
                }
            }
        };
        c.appendChild(b);
    });
}
function playQuickMath(c) {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random()*3)];
    let a = Math.floor(Math.random()*15), b = Math.floor(Math.random()*10);
    const result = op === '+' ? a+b : op === '-' ? a-b : a*b;
    c.innerHTML = `<div class="text-4xl font-black mb-6">${a} ${op} ${b} = ?</div>
                   <input type="number" id="ans" class="p-3 w-32 text-black rounded-xl text-center text-2xl">`;
    const input = c.querySelector('#ans'); input.focus();
    input.oninput = () => { if(parseInt(input.value) === result) finishMiniGame(); };
}
function playPatternMatch(c) {
    const patterns = [["#f87171", "#60a5fa", "#f87171"], ["#4ade80", "#fbbf24", "#4ade80"]];
    const p = patterns[Math.floor(Math.random()*patterns.length)];
    c.innerHTML = `<div class="flex gap-4 mb-8 justify-center">
        <div class="w-12 h-12 rounded" style="background:${p[0]}"></div>
        <div class="w-12 h-12 rounded" style="background:${p[1]}"></div>
        <div class="w-12 h-12 rounded border-2 border-dashed border-white flex items-center justify-center">?</div>
    </div>`;
    const options = ["#f87171", "#60a5fa", "#4ade80", "#fbbf24"];
    const grid = document.createElement('div'); grid.className = "flex gap-4 justify-center";
    options.forEach(opt => {
        const b = document.createElement('div'); b.className = "w-12 h-12 rounded cursor-pointer border-2 border-transparent hover:border-white";
        b.style.backgroundColor = opt;
        b.onclick = () => { if(opt === p[2]) finishMiniGame(); else startMiniGame(); };
        grid.appendChild(b);
    });
    c.appendChild(grid);
}
function playShapeCount(c) {
    const count = Math.floor(Math.random()*5)+5;
    c.innerHTML = `<div class="mb-4 text-xl">Có bao nhiêu hình tròn ⚪?</div>`;
    const grid = document.createElement('div'); grid.className = "grid grid-cols-5 gap-2 mb-6";
    const totalCells = 20;
    let placed = 0;
    for(let i=0; i<totalCells; i++) {
        const item = document.createElement('div');
        item.className = "text-2xl";
        if(placed < count && (Math.random() > 0.6 || i > 15)) {
            item.innerText = "⚪"; placed++;
        } else {
            item.innerText = "🟦";
        }
        grid.appendChild(item);
    }
    c.appendChild(grid);
    const input = document.createElement('input');
    input.type = "number"; input.className = "p-2 w-20 text-black text-center rounded-lg";
    input.oninput = () => { if(parseInt(input.value) === placed) finishMiniGame(); };
    c.appendChild(input); input.focus();
}

function updateHUD() {
    // Cập nhật các giá trị cũ
    document.getElementById('scoreVal').innerText = state.score;
    document.getElementById('deathVal').innerText = state.deaths;
    
    // Cập nhật tiến trình (ví dụ: 1/45)
    // Nếu bạn dùng biến qIndex, hãy dùng state.qIndex + 1
    const qCountEl = document.getElementById('qCount');
    const qTotalEl = document.getElementById('qTotal');

    if (qCountEl) {
        // Nếu đang trong game, hiển thị số câu hiện tại (qIndex + 1)
        // Dùng Math.min để không bị hiện "Câu 46/45" khi đã xong hết
        qCountEl.innerText = Math.min(state.qIndex + 1, allQuestions.length);
    }
    
    if (qTotalEl) {
        qTotalEl.innerText = allQuestions.length;
    }

    // CẬP NHẬT MỚI: Đúng và Sai
    const correctEl = document.getElementById('correctVal');
    const wrongEl = document.getElementById('wrongVal');
    
    if (correctEl) correctEl.innerText = state.correct;
    if (wrongEl) wrongEl.innerText = state.wrong;
}
function drawMarioPipe(x, y, height, isTop) {
    ctx.fillStyle = '#2db32d'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
    if (isTop) {
        ctx.fillRect(x, 0, 80, height - 35); ctx.strokeRect(x, 0, 80, height - 35);
        ctx.fillRect(x-5, height - 35, 90, 35); ctx.strokeRect(x-5, height - 35, 90, 35);
    } else {
        ctx.fillRect(x-5, y, 90, 35); ctx.strokeRect(x-5, y, 90, 35);
        ctx.fillRect(x, y + 35, 80, height - 35); ctx.strokeRect(x, y + 35, 80, height - 35);
    }
}

function loop() {
    if (state.mode === 'end') return; // Dừng vòng lặp khi hiện bảng kết quả
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ mây
    state.clouds.forEach(c => {
        c.x -= c.s * 0.2;
        if (c.x < -150) c.x = canvas.width + 100;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 20 * c.s, 0, Math.PI * 2);
        ctx.fill();
    });

    // ====== CHẾ ĐỘ PLAY ======
    if (state.mode === 'play') {

        state.bird.velocity += state.bird.gravity;
        state.bird.y += state.bird.velocity;
        state.bird.angle = Math.min(Math.PI/6, Math.max(-Math.PI/6, state.bird.velocity * 0.1));

        if (state.pipes.length > 0 && state.pipes[state.pipes.length-1].x < canvas.width - PIPE_DISTANCE) {
            let h = Math.random()*(canvas.height-PIPE_GAP-200)+100;
            state.pipes.push({x: canvas.width, top: h, bottom: canvas.height-h-PIPE_GAP, scored: false});
        }

        state.pipes.forEach(p => {
            p.x -= 3.5;

            if (!p.scored && p.x + 80 < state.bird.x) {
                state.score++;
                p.scored = true;
                state.lastPassedPipeY = p.top + (PIPE_GAP / 2);
                updateHUD();
            }

            if (
                state.bird.x+15 > p.x &&
                state.bird.x-15 < p.x+80 &&
                (state.bird.y-15 < p.top || state.bird.y+15 > canvas.height-p.bottom)
            ) {
                triggerQuestion();
            }
        });

        state.pipes = state.pipes.filter(p => p.x > -150);

        if(state.bird.y > canvas.height || state.bird.y < 0) {
            triggerQuestion();
        }
    }

    // ====== CHẾ ĐỘ WAIT (đứng yên) ======
    if (state.mode === 'wait') {
        state.bird.velocity = 0; // không rơi
    }

    // Vẽ ống
    state.pipes.forEach(p => {
        drawMarioPipe(p.x, 0, p.top, true);
        drawMarioPipe(p.x, canvas.height - p.bottom, p.bottom, false);
    });

    // Vẽ chim
    ctx.save();
    ctx.translate(state.bird.x, state.bird.y);
    ctx.rotate(state.bird.angle);
    ctx.fillStyle = "#FFD700";
    ctx.font = '900 35px "Font Awesome 6 Free"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\uf4ba', 0, 0);
    ctx.restore();

    requestAnimationFrame(loop);
}


const handleInput = () => {
    if (state.mode === 'play') state.bird.velocity = state.bird.jump; 
    if (state.mode === 'wait') { state.mode = 'play'; document.getElementById('resumeHint').classList.add('hidden'); state.bird.velocity = state.bird.jump; }
};
window.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') handleInput(); });
window.addEventListener('mousedown', handleInput);
init();