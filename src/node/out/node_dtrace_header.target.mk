# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := node_dtrace_header
### Rules for action "node_dtrace_header":
quiet_cmd__Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header = ACTION _Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header $@
cmd__Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header = LD_LIBRARY_PATH=$(builddir)/lib.host:$(builddir)/lib.target:$$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; cd $(srcdir)/.; mkdir -p $(obj)/gen; dtrace -h -xnolibs -s src/node_provider.d -o "$(obj)/gen/node_provider.h"

$(obj)/gen/node_provider.h: obj := $(abs_obj)
$(obj)/gen/node_provider.h: builddir := $(abs_builddir)
$(obj)/gen/node_provider.h: export BUILT_PRODUCTS_DIR := ${abs_builddir}
$(obj)/gen/node_provider.h: export CONFIGURATION := ${BUILDTYPE}
$(obj)/gen/node_provider.h: export PRODUCT_NAME := node_dtrace_header
$(obj)/gen/node_provider.h: export SDKROOT := 
$(obj)/gen/node_provider.h: export SRCROOT := ${abs_srcdir}/
$(obj)/gen/node_provider.h: export SOURCE_ROOT := ${SRCROOT}
$(obj)/gen/node_provider.h: export TARGET_BUILD_DIR := ${abs_builddir}
$(obj)/gen/node_provider.h: export TEMP_DIR := ${TMPDIR}
$(obj)/gen/node_provider.h: TOOLSET := $(TOOLSET)
$(obj)/gen/node_provider.h: $(srcdir)/src/node_provider.d FORCE_DO_CMD
	$(call do_cmd,_Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header)

all_deps += $(obj)/gen/node_provider.h
action__Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header_outputs := $(obj)/gen/node_provider.h


### Rules for final target.
# Build our special outputs first.
$(obj).target/node_dtrace_header.stamp: | $(action__Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header_outputs)

# Preserve order dependency of special output on deps.
$(action__Users_samcaldwell_Desktop_git_nemesis_src_node_node_gyp_node_dtrace_header_target_node_dtrace_header_outputs): | 

$(obj).target/node_dtrace_header.stamp: TOOLSET := $(TOOLSET)
$(obj).target/node_dtrace_header.stamp:  FORCE_DO_CMD
	$(call do_cmd,touch)

all_deps += $(obj).target/node_dtrace_header.stamp
# Add target alias
.PHONY: node_dtrace_header
node_dtrace_header: $(obj).target/node_dtrace_header.stamp

# Add target alias to "all" target.
.PHONY: all
all: node_dtrace_header

